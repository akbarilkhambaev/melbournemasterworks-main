<script setup lang="ts">
import { ref } from 'vue';
import imgWork from '/images/works/clean.jpg';

// Определяем объект формы
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// Функция для отправки данных формы
const submitForm = async () => {
  try {
    // Выполняем запрос к API-эндпоинту
    const response = await $fetch('/api/sendMail', {
      method: 'POST',
      body: form.value,
    });

    if (response.success) {
      alert('Заявка успешно отправлена!');
      // Можно очистить форму
      form.value = { name: '', email: '', phone: '', message: '' };
    } else {
      alert(`Ошибка при отправке: ${response.error}`);
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    alert('Ошибка при отправке заявки.');
  }
};
</script>

<template>
  <div class="py-md-15 py-8 bg-lightmuted">
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
                data-aos-duration="1000">Request a quote</h2>
            <form @submit.prevent="submitForm">
              <v-row class="mt-1">
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                      label="Name"
                      variant="outlined"
                      color="primary"
                      placeholder="Name"
                      v-model="form.name"
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
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn class="mt-7 px-8 py-2 w-100" type="submit" flat size="large" color="primary">
                Submit
              </v-btn>
            </form>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="pa-sm-10 pa-5 rounded-md bg-white h-100">
            <h2 class="text-h2 text-dark text-left" data-aos="fade-left" data-aos-delay="200"
                data-aos-duration="1000">Call us today to get a quote!</h2>
            <h2 class="section-title font-weight-bold text-center">
              +61 4 0440 4996
            </h2>
            <v-img class="rounded-md" :src="imgWork" height="350px" alt="post" cover />
          </div>
        </v-col>
      </v-row>
      <!-- -----------------------------------------------
           End Contact Form
      ----------------------------------------------- -->
    </v-container>
  </div>
</template>