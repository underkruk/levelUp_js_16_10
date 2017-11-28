<h2>Laravel BOM API</h2>

<p>Laravel BOM API will provide you the tools for making REST FULL BOM API</p>

<p>Here is a list of the packages installed:</p>


<ul>  
  <li>
    <a href="https://laravel.com/docs/5.4/passport">Laravel Passport</a>
  </li>
  <li>
    <a href="https://github.com/spatie/laravel-fractal">Laravel Fractal</a>
  </li>
</ul>


<h2>Installation</h2>

<p>Use Git or checkout with SVN using the web URL.</p>

<p>To install the project you can use composer. Run <code>composer install</code> and istall all dependencies</p>

<p>Modify the .env file to suit your needs</p>

<pre>
  <code>
    APP_ENV=local
    APP_DEBUG=true
    APP_KEY=base64:JqyMTmt5qr1CW6BH+GG+4iKfU4RiNjZTLy33TdTT7+4=

    API_STANDARDS_TREE=vnd
    API_SUBTYPE=api
    API_PREFIX=api
    API_VERSION=v1
    API_DEBUG=true

    DB_HOST=localhost
    DB_DATABASE=laravel_api
    DB_USERNAME=homestead
    DB_PASSWORD=secret

    CACHE_DRIVER=file
    SESSION_DRIVER=file
    QUEUE_DRIVER=sync

    MAIL_DRIVER=smtp
    MAIL_HOST=mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
  </code>
</pre>

<p>When you have the .env with your database connection set up you can run your migrations</p>

<pre>
  <code>php artisan migrate</code>
</pre>

<p>Then run <code>php artisan passport:install</code></p>



