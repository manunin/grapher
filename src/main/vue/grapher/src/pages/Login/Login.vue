<template>
  <div class="card flex flex-col justify-center h-screen items-center">
    <g-brand-label>{{ t('login.brandLabel') }}</g-brand-label>
    <Form v-slot="$form"
          :initialValues="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-56">
      <FormField class="flex flex-col gap-2">
        <InputText name="username"
                   type="text"
                   :placeholder="t('login.username')"
                   fluid/>
        <Message v-if="$form.username?.invalid"
                 severity="error"
                 size="small"
                 variant="simple">
          {{ $form.username.error?.message }}
        </Message>
      </FormField>
      <FormField class="flex flex-col gap-2">
        <Password name="password"
                  type="text"
                  :placeholder="t('login.password')"
                  :feedback="false"
                  toggleMask
                  fluid/>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
      </FormField>
      <g-primary-button type="submit" :label="t('login.login')"/>
      <g-social-medial-login-panel/>
    </Form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useToast} from 'primevue/usetoast';
import {zodResolver} from '@primevue/forms/resolvers/zod';
import {z} from 'zod';
import GSocialMedialLoginPanel from "@/components/GSocialMedialLoginPanel.vue";
import GBrandLabel from "@/components/GBrandLabel.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const toast = useToast();

const initialValues = ref({
  username: '',
  password: ''
});

const resolver = zodResolver(
    z.object({
      username: z.string().min(1, {message: t('login.validation.usernameRequired')}),
      password: z.string()
          .min(1, {message: t('login.validation.passwordMinLength', {min: 1})})
          .max(10, {message: t('login.validation.passwordMaxLength', {max: 10})})
    })
);


const onFormSubmit = (state) => {
  console.log(state);
  if (state.valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000
    });
  }
};

</script>

