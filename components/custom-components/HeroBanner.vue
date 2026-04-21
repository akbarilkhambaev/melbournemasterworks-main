<template>
  <div class="corporate-banner pt-md-16 pt-8 pb-md-12 pb-8 mt-95">
    <v-container class="inner-content">
      <!-- Верхний flex row с иконками и преимуществами -->
      <v-row>
        <v-col cols="12" md="12" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
          <h1 class="text-h1 text-white mb-6 text-center">
            We Provide Quality Roof Restoration Services in Melbourne
          </h1>
        </v-col>
      </v-row>

      <v-row class="align-center justify-space-between pt-md-7">
        <div cols="12" class="mt-md-0 mt-3 w-100">
          <div class="form__box rounded-md">
            <div class="form__submit">
              <div class="flex flex-column">
                <div class="form__submit-header">
                  <h5>ENQUIRE NOW</h5>
                  <span>10 years warranty</span>
                </div>
                <div class="form__submit-box">
                  <div class="form__submit-item">
                    <v-text-field
                        v-model="form.fullname"
                        label="Name"
                        variant="outlined"
                        color="primary"
                        placeholder="Name"
                        required
                        :rules="[rules.required]"
                        size="small"
                        class="flex-1"
                    ></v-text-field>
                  </div>
                  <div class="form__submit-item">
                    <v-text-field
                        v-model="form.mail"
                        label="Email"
                        variant="outlined"
                        color="primary"
                        placeholder="Email"
                        required
                        size="small"
                        class="flex-1"
                    ></v-text-field>
                  </div>
                  <div class="form__submit-item">
                    <v-text-field
                        v-model="form.phone"
                        label="Phone"
                        variant="outlined"
                        color="primary"
                        placeholder="Phone"
                        required
                        :rules="[rules.required]"
                        size="small"
                        class="flex-1"
                    ></v-text-field>
                  </div>
                  <div class="form__submit-item">
                    <v-text-field
                        v-model="form.message"
                        label="Message"
                        variant="outlined"
                        color="primary"
                        placeholder="Message"
                        required
                        :rules="[rules.required]"
                        size="small"
                        class="flex-1"
                    ></v-text-field>
                  </div>
                  <div class="form__submit-item">
                    <v-btn @click="submitForm" variant="flat" color="primary" size="large">
                      Submit
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="form__info-box">
                <div class="form__info-item">
                  <v-img src="https://sevenroofing.com.au/wp-content/uploads/2021/04/icon_residential_dark.svg" alt="" />
                  <div>
                    <span>Residential</span>
                  </div>
                </div>

                <div class="form__info-item">
                  <v-img src="https://sevenroofing.com.au/wp-content/uploads/2021/04/icon_commercial_dark.svg" alt="" />
                  <div>
                    <span>Commercial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>

    <!-- Уведомление (Snackbar) -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" top right>
      {{ notification }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  fullname: "",
  mail: "",
  phone: "",
  services: "Roof Restoration And Painting",
  suburb: "",
  message: "",
});

const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
  phone: (value) => /^\d{8,12}$/.test(value) || "Phone number must be 8-12 digits",
};

const snackbar = ref(false);
const notification = ref("");

const submitForm = async () => {
  console.log(form.value);
  try {
    const response = await $fetch("/api/sendMail.php", {
      method: "POST",
      body: form.value,
    });

    if (response.success) {
      notification.value = "Successfully sent!";
      snackbar.value = true;
      // Очистка формы
      form.value = {
        fullname:null,
        mail:null,
        phone:null,
        services: "Roof Restoration And Painting",
        suburb: "",
        message: null,
      };
    } else {
      notification.value = `Error sending: ${response.error}`;
      snackbar.value = true;
    }
  } catch (error) {
    console.error("Request error:", error);
    notification.value = "Error sending request.";
    snackbar.value = true;
  }
};
</script>

<style>
/* Ваши стили остаются без изменений */
.corporate-banner {
  background: url("/images/backgrounds/roof1.jpg") no-repeat center center;
  background-size: cover;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Чёрный оверлей */
.corporate-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.corporate-banner > .inner-content {
  position: relative;
  z-index: 2;
}

/* Остальные стили, как указано ранее */
.form__box {
  display: flex;
  width: 100%;
  background: #fff;
  margin-top: 140px;
}
.form__submit {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.form__submit-box {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-content: center;
}
.flex-column {
  padding: 20px 30px;
}
.form__submit-item {
  flex: 1;
  align-items: center;
}
.form__submit-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.form__info-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  border-radius: 8px;
}
.form__info-item img {
  display: flex;
  align-items: center;
  max-width: 70px;
  height: 80px;
}
.form__info-item div span {
  color: #404c64;
}
.form__info-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8fafc;
  height: 100%;
  padding: 20px 35px 44px 35px;
}
.form__info-item:last-child {
  border-left: 1px solid #414c64;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
.form__submit-header h5 {
  color: #060c35;
  font-size: 18px;
}

/* Responsive стили для мобильных и планшетов остаются без изменений */
@media (max-width: 480px) {
  .corporate-banner {
    height: 100vh;
    padding: 20px;
  }
  .inner-content {
    padding: 0 10px;
  }
  .form__box {
    flex-direction: column;
    margin-top: 40px;
  }
  .form__submit,
  .form__info-box {
    flex-direction: column;
    align-items: stretch;
  }
  .form__submit-box {
    flex-direction: column;
    gap: 10px;
  }
  .form__info-item {
    border-left: none;
    border-top: 1px solid #414c64;
    border-radius: 0;
    padding: 15px;
    margin-top: 10px;
  }
  .form__info-box {
    display: none;
  }
  .text-h1 {
    font-size: 38px !important;
    line-height: 36px !important;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .corporate-banner {
    height: 750px;
    padding: 30px;
  }
  .inner-content {
    padding: 0 20px;
  }
  .form__box {
    flex-direction: column;
    margin-top: 100px;
  }
  .form__submit,
  .form__info-box {
    flex-direction: column;
    align-items: stretch;
  }
  .form__submit-box {
    flex-direction: column;
    gap: 10px;
  }
  .form__info-item {
    border-left: none;
    border-top: 1px solid #414c64;
    border-radius: 0;
    padding: 15px;
    margin-top: 10px;
  }
  .form__info-box {
    display: none;
  }
}
</style>