<template>
  <form action="submit" class="form__main">
    <div class="form__container" :class="{'form__input-error': $v.name.$error}">
      <input
        type="text"
        class="form__input"
        placeholder="Имя"
        v-model="name"
        @blur="$v.name.$touch()"
      />
      <div v-if="$v.name.$dirty">
        <span class="form__error" v-if="!$v.name.required"
          >Это обязательное поле</span
        >
      </div>
    </div>
    <div class="form__container" :class="{'form__input-error': $v.job.$error}">
      <input
        type="text"
        class="form__input"
        placeholder="Должность"
        v-model="job"
        @blur="$v.job.$touch()"
      />
      <div v-if="$v.job.$dirty">
        <span class="form__error" v-if="!$v.job.required"
          >Это обязательное поле</span
        >
      </div>
    </div>
    <div
      class="form__container"
      :class="{'form__input-error': $v.company.$error}"
    >
      <input
        type="text"
        class="form__input"
        placeholder="Компания"
        v-model="company"
        @blur="$v.company.$touch()"
      />
      <div v-if="$v.company.$dirty">
        <span class="form__error" v-if="!$v.company.required"
          >Это обязательное поле</span
        >
      </div>
    </div>
    <div class="form__container" :class="{'form__input-error': $v.tel.$error}">
      <input
        type="tel"
        class="form__input"
        placeholder="Телефон"
        v-model="tel"
        @blur="$v.tel.$touch()"
        @input="$v.tel.$touch()"
      />
      <div v-if="$v.tel.$dirty">
        <span class="form__error" v-if="!$v.tel.required"
          >Это обязательное поле</span
        >
        <span class="form__error" v-if="!$v.tel.numeric"
          >Введите корректный номер телефона</span
        >
      </div>
    </div>
    <div
      class="form__container"
      :class="{'form__input-error': $v.email.$error}"
    >
      <input
        type="email"
        class="form__input"
        placeholder="E-mail"
        v-model="email"
        @blur="$v.email.$touch()"
        @input="$v.email.$touch()"
      />
      <div v-if="$v.email.$dirty">
        <span class="form__error" v-if="!$v.email.required"
          >Это обязательное поле</span
        >
        <span class="form__error" v-else-if="!$v.email.email"
          >Введите верный email</span
        >
      </div>
    </div>
    <div
      class="form__container"
      :class="{'form__input-error': $v.comment.$error}"
    >
      <textarea
        name="comment"
        cols="30"
        rows="6"
        class="form__text"
        placeholder="Расскажите о своей задаче"
        v-model="comment"
        @blur="$v.comment.$touch()"
      ></textarea>
      <div v-if="$v.comment.$dirty">
        <span class="form__error" v-if="!$v.comment.required"
          >Это обязательное поле</span
        >
      </div>
    </div>
    <label class="form__label" for="accept">
      <input
        type="checkbox"
        value="yes"
        id="accept"
        class="form__checkbox"
        @change="$v.personalData.touch()"
        v-model="personalData"
      />
      <span class="form__pseudo-item"></span>
      <span class="form__accept"
        >Я согласен на обработку персональных данных</span
      >
    </label>
    <div>
      <button class="button button_footer" :disabled="$v.$invalid">
        Связаться с нами
      </button>
    </div>
  </form>
</template>

<script>
import {required, email, numeric} from 'vuelidate/lib/validators'
export default {
  name: 'Validation',
  data() {
    return {
      name: '',
      job: '',
      company: '',
      tel: '',
      email: '',
      comment: '',
      personalData: false,
    }
  },
  validations: {
    name: {
      required,
    },
    job: {
      required,
    },
    company: {
      required,
    },
    tel: {
      required,
      numeric,
    },
    email: {
      required,
      email,
    },
    comment: {
      required,
    },
    personalData: {
      required,
    },
  },
}
</script>

<style scoped></style>
