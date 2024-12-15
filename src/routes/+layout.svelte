<script lang="ts">
    import { page } from '$app/stores';
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();
    let loggedIn = $state(false);
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>Conduit</title>
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link
      href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css" />
</svelte:head>


<nav class="navbar navbar-light">
    <div class="container">
        <a class="navbar-brand" href="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname === "/"}" href="/">Home</a>
            </li>
            {#if loggedIn}
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname.includes("/editor")}" href="/editor"> <i class="ion-compose"></i>&nbsp;New Article </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname.includes("/settings")}" href="/settings"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname.includes("/profile")}" href="/profile/eric-simons">
                    <img src="http://i.imgur.com/Qr71crq.jpg" alt="Eric Simons" class="user-pic" />
                    Eric Simons
                </a>
            </li>
            {:else}
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname.includes("/login")}" href="/login">Sign in</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" class:active="{$page.url.pathname.includes("/register")}" href="/register">Sign up</a>
            </li>
            {/if} 
        </ul>
    </div>
  </nav>

{@render children()}

<footer>
    <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
            design licensed under MIT.
        </span>
    </div>
</footer>