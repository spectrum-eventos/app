<template lang="pug">
q-layout(view="lHh Lpr lFf").home
  q-toolbar
    img(src='statics/logo.png').logo
    q-toolbar-title
      | Spectrum
    q-btn(
      round
      icon='exit_to_app'
      @click='$auth.logout()'
      )
  q-page-container.container
    q-field(label='Evento').q-pa-md
      q-select(
        inverted
        filter
        filter-placeholder='Buscar'
        :options='eventOptions'
        v-model='selectedEvent'
        @input='fetchLists'
        )
    q-field(label='Chamada').q-pa-md
      q-select(
        inverted
        filter
        filter-placeholder='Buscar'
        :options='listOptions'
        :disabled='listOptions.length === 0'
        :readonly='listOptions.length === 0'
        v-model='selectedList'
        )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'home',
  components: {
  },
  props: {
  },
  data() {
    return {
      selectedEvent: 0,
      selectedList: 0,
    };
  },
  computed: {
    ...mapGetters('event', [
      'events',
    ]),
    ...mapGetters('list', [
      'lists',
    ]),
    eventOptions() {
      return this.events.map((event) => {
        const option = {
          label: event.name,
          value: event.id,
        };
        return option;
      });
    },
    listOptions() {
      return this.lists.map((list) => {
        const option = {
          label: list.name,
          value: list.id,
        };
        return option;
      });
    },
    eventParams() {
      return {
        'search[s]': 'created_at desc',
      };
    },
    listParams() {
      return {
        'search[event_id_eq]': this.selectedEvent,
        'search[s]': 'created_at desc',
      };
    },
  },
  methods: {
    ...mapActions('event', [
      'getAllEvents',
    ]),
    ...mapActions('list', [
      'getAllLists',
    ]),
    ...mapActions('presence', [
      'createPresence',
    ]),
    async fetchEvents() {
      try {
        this.$q.loading.show();
        await this.getAllEvents(this.eventParams);
        this.$q.loading.hide();
      } catch (err) {
        this.$q.loading.hide();
        this.$log.error(err);
      }
    },
    async fetchLists() {
      try {
        this.selectedList = 0;
        this.$q.loading.show();
        await this.getAllLists(this.listParams);
        this.$q.loading.hide();
      } catch (err) {
        this.$q.loading.hide();
        this.$log.error(err);
      }
    },
    validateResult(_err, result) {
      if (!this.selectedList) {
        this.displayError();
        return;
      }
      this.confirmPresence(result);
    },
    async displayError() {
      try {
        await this.$q.dialog({
          title: 'Selecione uma chamada',
          message: 'Por favor, selecione uma chamada para confirmar presença',
          ok: 'Ok',
        });
        QRScanner.scan(this.validateResult);
      } catch (err) {
        QRScanner.scan(this.validateResult);
        this.$log.error(err);
      }
    },
    async confirmPresence(user) {
      try {
        const date = new Date();
        await this.$q.dialog({
          title: 'Confirmar presença',
          message: `Confirmar presença de ${user} em ${moment(date).format('LLL')}`,
          ok: 'Confirmar',
          cancel: 'Cancelar',
        });
        this.create(user, date);
        QRScanner.scan(this.validateResult);
      } catch (err) {
        this.$log.error(err);
        QRScanner.scan(this.validateResult);
      }
    },
    async create(name, date) {
      try {
        await this.createPresence({ name, date, list_id: this.selectedList });
        this.$q.notify({
          type: 'positive',
          message: 'Presença confirmada com sucesso',
          timout: 1500,
        });
      } catch (err) {
        this.$log.error(err);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao confirmar presença',
          timout: 1500,
        });
      }
    },
  },
  mounted() {
    this.fetchEvents();
    QRScanner.show(status => this.$log.info(status));
    QRScanner.scan(this.validateResult);
  },
};
</script>

<style lang='stylus' scoped>
.home
  .logo
    width 50px
    height auto
  .container
    background #F5F7FA
</style>

