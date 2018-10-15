<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-page-container
    q-page#login
      img(src='statics/logo.png').logo
      span.title.q-pb-md Spectrum App
      q-card.login-card
        q-card-main
          form(@submit.prevent='submit')
            q-field(icon='person', :error='mailHasError', error-label='E-mail inválido')
              q-input(float-label='E-mail' v-model='form.email' type='email'
                @blur='$v.form.email.$touch' :error='$v.form.email.$error')
            q-field.q-my-sm(icon='lock open')
              q-input(float-label='Senha' v-model='form.password' type='password')
            q-card-separator
            q-btn.q-my-sm.float-right(:loading='submiting' type='submit' color='primary').full-width
              | Acessar
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  components: {
  },
  async beforeRouteEnter(to, from, next) {
    try {
      next();
    } catch (err) {
      this.$log.error(err);
    }
  },
  props: {
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      mailHasError: null,
      submiting: false,
    };
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
  computed: {
  },
  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify('Por favor, reveja os campos.');
        return;
      }

      this.submiting = true;
      this.logUserIn();
    },
    async logUserIn() {
      try {
        await this.$auth.login({
          fetchUser: true,
          data: this.form,
        });
        this.submiting = false;
      } catch (err) {
        this.$log.error(err);
        this.submiting = false;
        this.$q.notify({
          type: 'negative',
          message: 'E-mail ou senha incorretos. Por favor, tente novamente.',
        });
      }
    },
  },
  mounted() {
    QRScanner.prepare();
  },
};
</script>

<style lang='stylus' scoped>
@import '~variables'

#login
  background $grey-3
  display flex
  flex-direction column
  justify-content center
  align-items center
  .title
    color $blue-grey-9
    font-size 2rem
  .login-card
    width 300px
    background white
  .logo
    width 300px
    height auto
</style>
