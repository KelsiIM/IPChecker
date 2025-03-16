FROM php:8.3-apache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html/

# Copy composer.json and composer.lock from the root directory
COPY composer.json composer.lock /var/www/html/

# Copy the rest of the application from the src/ directory
COPY src/ /var/www/html/

# Install Composer dependencies inside the Docker container
RUN composer install --no-dev --optimize-autoloader --no-interaction