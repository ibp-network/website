### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Special Instructions for Apache

If you are self-hosting this website in an clean installation of Apache webserver on Ubuntu, please take note of the following configuiration requirements:

### Enable granular control with `.htaccess` files

Open the general configuration file for Apache (adjust to your particular circumstances)

``` bash
sudo nano /etc/apache2/apache2.conf
```

and amend/add the following lines:

``` apache
<Directory /var/www/website/build>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

### Enable the use of Rewrite mod

You can use the following command:

``` bash
sudo a2enmod rewrite
```

### Add the adequate `.htaccess` content to the root directory

Create a new `.htaccess` file with

``` bash
sudo nano /var/www/website/build/.htaccess
```

And enter the following content:

``` apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Restart the webserver

With the following command:

``` bash
sudo systemctl restart apache2
```