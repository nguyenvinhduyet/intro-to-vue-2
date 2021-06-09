<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Signup Page</h1>
                <v-form>
                    <v-text-field label="Email" type="email"></v-text-field>
                    <v-autocomplete label="Which browser do you use?" :items="browsers" />
                    <v-file-input label="Attach profile picture" />
                    <v-text-field label="Birthday" v-model="birthday" readonly />
                    <v-date-picker v-model="birthday" :active-picker.sync="activePicker"/>
                    <v-checkbox label="Agree to terms & conditions" />
                    <v-btn type="submit" color="primary">Submit</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
      return {
          birthday: '',
          browsers: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave']
      }
  }
}
</script>