<script lang="ts">
    import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";

    let { form, data } : { form: ActionData, data: PageData } = $props()
</script>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                    <a href="/register">Need an account?</a>
                </p>

                {#if form}
                <ul class="error-messages">
                    <li>{form.message}</li>
                </ul>    
                {/if}
                {#if data.redirectMessage}
                <ul class="error-messages">
                    <li>Page requires login</li>
                </ul>    
                {/if}

                <form method="POST" use:enhance>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="email" name="email" placeholder="Email" />
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" name="password" placeholder="Password" />
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                </form>
            </div>
        </div>
    </div>
  </div>