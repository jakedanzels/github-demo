<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating" fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <h1>{{header}}</h1>
                 <fieldset>
                <!-- Section 1 -->
                <legend><span class="section">1</span>Your Basic Info</legend>
                <label class="" for="name">Name:</label>
                <input type="text" name="name" value="" id="name" required />

                <label class="" for="email">Email:</label>
                <input type="email" name="email" value="" id="email" required />

                <label for="password">password:</label>
                <input type="password" name="password" value="" id="password" required />
                </fieldset>

                
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email"/>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password"/>
                </div> 
                <p v-if="!formIsValid">Please enter a valid e-mail and password (at least 6 characters)</p>
                <base-button>{{submitButtonCaption}}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
                <p>Forgot Password? Tough shit, I haven't learned how to deal with that yet.</p>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption() {
            if(this.mode === 'login'){
                return 'Login';
            }else{
                return 'Sign up';
            }
        },
        switchModeButtonCaption() {
            if(this.mode === 'login'){
                return 'Sign up';
            }else{
                return 'Login';
            }
        },
        header() {
            if(this.mode === 'login'){
                return 'Existing User Login';
            }else{
                return 'New User Sign up';
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            try{
                if (this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                return;
                }
                this.isLoading = true;

                const actionPayload = {
                    email: this.email,
                    password: this.password
                };

                if (this.mode === 'login'){
                    await this.$store.dispatch('login', actionPayload);
                } else {
                    await this.$store.dispatch('signup', actionPayload);
                }
                this.$router.replace('/home');
            } catch (err) {
                this.error = err.message || 'Failed to authenticate...';
            }
            
            this.isLoading = false;
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>


<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>