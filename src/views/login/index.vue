<template>
    <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon name="user" /> -->
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon name="password" /> -->
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.logIn') }}
      </el-button>

      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.username') }} : admin </span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }} </span>
        </div>
        <div class="tips">
          <span>{{ $t('login.username') }} : editor </span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }} </span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog=true"
        >
          {{ $t('login.thirdparty') }}
        </el-button>
      </div>
    </el-form>

    <el-dialog
      :title="$t('login.thirdparty')"
      :visible.sync="showDialog"
    >
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import LangSelect from '@/components/LangSelect/index.vue'
import { isValidUsername } from '@/utils/validate'

@Component({
    name: 'Login',
    components: {
        LangSelect
    }
})



export default class extends Vue {
    private validateUsername = (rule: any, value: string, callback: any) => {
        if(!isValidUsername(value)) {
            callback(new Error('Please enter the correct uer name'))
        } else {
            callback()
        }
    }

    private validatePassword = (rule: any, value: string, callback: any) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
        }
    }

    private showDialog = false
    private passwordType = 'password'
    private loading = false
    private loginForm = {
        username: 'admin',
        password: '111111'
    }
    private loginRules = {
        username: [{ validator: this.validateUsername, trigger: 'blur' }],
        password: [{ validator: this.validatePassword, trigger: 'blur'}]
    }
    private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
    }

    private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        }).catch(err => {
          console.warn(err)
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }

    mounted() {
    if (this.loginForm.username === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
  }
}
</script>