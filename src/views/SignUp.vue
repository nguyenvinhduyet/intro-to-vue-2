<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Signup Page</h1>
                <v-form ref="signUpForm" v-model="formValidity">
                    <v-text-field label="Email" type="email" :rules="emailRules" v-model="email"></v-text-field>
                    <v-autocomplete label="Which browser do you use?" :items="browsers" />
                    <v-file-input label="Attach profile picture" />
                    <v-text-field label="Birthday" v-model="birthday" readonly />
                    <v-date-picker v-model="birthday" :active-picker.sync="activePicker"/>
                    <v-checkbox v-model="agreeToTerms" label="Agree to terms & conditions" :rules="agreeToTermsRules" required />
                    <v-btn type="submit" color="primary" :disabled="!formValidity" class="mr-4">Submit</v-btn>
                    <v-btn color="success" class="mr-4" @click="validateForm">Validate Form</v-btn>
                    <v-btn color="warning" @click="resetValidation" class="mr-4">Reset Validation</v-btn>
                    <v-btn color="error" @click="resetForm">Reset</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
      return {
          agreeToTerms: false,
          agreeToTermsRules: [
              value => !!value || 'You must agree to the terms and conditions to sign up for an account.'
          ],
          email: '',
          emailRules: [
              value => !!value || 'Email is required',
              value => value.indexOf('@') !== 0 || 'Email should have a username.',
              value => value.includes('@') || 'Email should include an @',
              value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
              value => value.indexOf('.') <= value.length - 3 || 'Email should contain a valid domain extension.'
          ],
          birthday: '',
          browsers: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave'],
          formValidity: false
      }
  },

  methods: {
      resetForm() {
          this.$refs.signUpForm.reset()
      },
      resetValidation() {
          this.$refs.signUpForm.resetValidation()
      },
      validateForm() {
          this.$refs.signUpForm.validate()
      }
  }
}
</script>

