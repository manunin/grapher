<template>
  <div class="card flex flex-col justify-center h-screen items-center">
    <h1 class="text-4xl font-bold mb-4">grapher</h1>
    <Form v-slot="$form"
          :initialValues="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-56">
      <FormField class="flex flex-col gap-2">
        <InputText name="username"
                   type="text"
                   placeholder="Username"
                   fluid/>
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
          {{$form.username.error?.message}}
        </Message>
      </FormField>
      <FormField class="flex flex-col gap-2">
        <Password name="password" type="text" placeholder="Password" :feedback="false" toggleMask fluid/>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{$form.password.error?.message}}
        </Message>
      </FormField>
      <Button type="submit" severity="primary" label="Submit"/>
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

const toast = useToast();

const initialValues = ref({
  username: '',
  password: ''
});

const resolver =  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      password: z.string()
          .min(1, { message: 'Password is required.' })
          .max(10, { message: 'Password must be less than 10 characters.' })
          .refine((value) => /[a-z]/.test(value), {
            message: 'Must have a lowercase letter.'
          })
          .refine((value) => /[A-Z]/.test(value), {
                message: 'Must have an uppercase letter.'
          })
          .refine((value) => /d/.test(value), {
                message: 'Must have a number.'
          })
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

