<template>
  <div class="py-md-15 py-8 bg-lightmuted" targetId="quote-section" id="quote-section" >
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <div class="text-center">
            <!-- Заголовок или другая информация -->
          </div>
        </v-col>
      </v-row>
      <!-- -----------------------------------------------
           Start Contact Form
      ----------------------------------------------- -->
      <v-row justify="center">
        <v-col cols="12" md="6">
          <div class="pa-sm-10 pa-5 rounded-md bg-white h-100">
            <h2 class="text-h2 text-dark mb-md-12 mb-6 text-center" data-aos="fade-left" data-aos-delay="200"
                data-aos-duration="1000">
              Request a quote
            </h2>
            <!-- Оборачиваем форму в v-form -->
            <v-form ref="formRef" v-model="valid" @submit.prevent="submitForm">
              <v-row class="mt-1">
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                      label="Name"
                      variant="outlined"
                      color="primary"
                      placeholder="Name"
                      v-model="form.name"
                      :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                      label="Email"
                      variant="outlined"
                      type="email"
                      color="primary"
                      placeholder="Email"
                      v-model="form.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                      label="Phone number"
                      variant="outlined"
                      type="text"
                      color="primary"
                      placeholder="Phone number"
                      v-model="form.phone"
                      :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                      name="message"
                      color="primary"
                      variant="outlined"
                      label="Message"
                      rows="3"
                      v-model="form.message"
                      :rules="[rules.required]"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn class="mt-7 px-8 py-2 w-100" type="submit" flat size="large" color="primary">
                Submit
              </v-btn>
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="pa-sm-10 pa-5 rounded-md bg-white h-100">
            <h2 class="text-h2 text-dark text-left" data-aos="fade-left" data-aos-delay="200"
                data-aos-duration="1000">
              Call us today to get a quote!
            </h2>
            <a href="tel:+61404404996" class="section-title font-weight-bold text-center d-block text-decoration-none">
              +61 4 0440 4996
            </a>
            <v-img class="rounded-md" :src="imgWork" height="350px" alt="post" cover />
          </div>
        </v-col>
      </v-row>
      <!-- -----------------------------------------------
           End Contact Form
      ----------------------------------------------- -->
    </v-container>

    <!-- Notification Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      :color="snackbarColor"
      location="top right"
      rounded="pill"
      elevation="4"
    >
      <div class="d-flex align-center gap-2">
        <v-icon :icon="snackbarColor === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" class="mr-2" />
        {{ notification }}
      </div>
      <template #actions>
        <v-btn icon="mdi-close" variant="text" size="small" @click="snackbar = false" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import imgWork from '/images/works/newImage/1-22.jpg';

// Форма и валидация
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});
const valid = ref(false);
const formRef = ref(null);

// Правила валидации
const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
  phone: (value: string) => /^\d{8,12}$/.test(value) || 'Phone number must be 8-12 digits'
};

// Переменные для уведомления
const snackbar = ref(false);
const snackbarColor = ref('success');
const notification = ref('');

// Функция отправки формы
const submitForm = async () => {
  if (formRef.value) {
    const { valid: isValid } = await formRef.value.validate();
    if (!isValid) {
      notification.value = 'Please fill in the required fields correctly.';
      snackbar.value = true;
      return;
    }
  }

  try {
    const response = await $fetch('/api/sendMail', {
      method: 'POST',
      body: {
        fullname: form.value.name,
        mail: form.value.email,
        phone: form.value.phone,
        message: form.value.message,
      },
    });

    if (response.success) {
      notification.value = 'Your request has been sent successfully!';
      snackbarColor.value = 'success';
      form.value = { name: '', email: '', phone: '', message: '' };
      formRef.value.resetValidation();
      await nextTick();
      snackbar.value = true;
    } else {
      notification.value = `Error sending: ${response.error}`;
      snackbarColor.value = 'error';
      snackbar.value = true;
    }
  } catch (error) {
    console.error('Request error:', error);
    notification.value = 'Failed to send. Please try again.';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
};
</script>

<style>
/* Пример базовых стилей */
.py-md-15 {
  padding-top: 15rem;
  padding-bottom: 15rem;
}
.py-8 {
  padding-top: 8rem;
  padding-bottom: 8rem;
}
.bg-lightmuted {
  background-color: #f8f9fa;
}
.pa-sm-10 {
  padding: 10px;
}
.pa-5 {
  padding: 5px;
}
.rounded-md {
  border-radius: 0.5rem;
}
.bg-white {
  background-color: #fff;
}
.h-100 {
  height: 100%;
}

/* Остальные стили можно добавить по необходимости */
</style>