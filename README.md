# Guya.moe
Generalized manga reading framework. Adapted for Kaguya-sama manga, but can be used generically for any and all manga.

Testing Supported By<br/>
<img width="160" src="http://foundation.zurb.com/sites/docs/assets/img/logos/browser-stack.svg" alt="BrowserStack"/>

⚠ **Note:** This install instruction below focuses on Debian OS Bullseye (e.g. RaspberryPi arm64) only.

## Navigation
- [Docker installation (recommended)](https://github.com/Alexgamer470/guyamoe#docker-installation)
- [Portainer installation](https://github.com/Alexgamer470/guyamoe#portainer-installation)
- [Direct installation](https://github.com/Alexgamer470/guyamoe#direct-installation)
  - [Install prerequisites](https://github.com/Alexgamer470/guyamoe#install-prerequisites)
  - [Install guyamoe](https://github.com/Alexgamer470/guyamoe#install-guyamoe)
  - [Start the server](https://github.com/Alexgamer470/guyamoe#start-the-server)
- [Other info](https://github.com/Alexgamer470/guyamoe#other-info)
  - [Relevant URLs](https://github.com/Alexgamer470/guyamoe#relevant-urls)
  - [Folder structure](https://github.com/Alexgamer470/guyamoe#folder-structure)

## Docker installation
1. Clone Guyamoe's repository.
```
git clone https://github.com/Alexgamer470/guyamoe /your/installation/path
```
2. Change the installation path and HOST_IP to the IP you are going to host on in [`./docker/docker-compose.yml`](https://github.com/Alexgamer470/guyamoe/blob/develop/docker/docker-compose.yml)

3. Run the docker files
```
cd ./docker && docker compose build && docker compose up
```
## Portainer installation
1. Clone Guyamoe's repository.
```
git clone https://github.com/Alexgamer470/guyamoe /your/installation/path
```

2. Create a custom template with build method `Repository`, paste the URL of this repository into `Repository URL` and set the `Compose path` to `docker/docker-compose.yml`. Click on `Create custom template`.

3. Now click on the template and then on `View stack` (directly under the template's name).

4. Edit the installation path to the path where you have cloned this repository and `HOST_IP` to the IP you are going to host on. Click on `Deploy the stack`.

## Direct installation

### Install prerequisites 
- `git`
- `python 3.6.5+ (incl. dependencies)`
- `python psycopg2 dependencies (libpq-dev)`
- `pip`
- `virtualenv`
```
sudo apt install git python3 build-essential python3-dev libpq-dev python3-pip virtualenv
```

### Install Guyamoe
1. Create a venv for Guyamoe in your home directory.
```
virtualenv ~/guyamoe
```

2. Clone Guyamoe's source code into the venv.
```
git clone https://github.com/Alexgamer470/guyamoe ~/guyamoe/app
```

3. Activate the venv.
```
cd ~/guyamoe/app && source ../bin/activate
```

4. Install Guyamoe's dependencies.
```
pip3 install -r requirements.txt
```
At this point you may get an error that pg_config is missing. In that case, you're missing the `libpq-dev` package. [Install development version of PostgreSQL.](https://stackoverflow.com/questions/11618898/pg-config-executable-not-found)

5. Change the value of the `SECRET_KEY` variable to a randomly generated string.
```
sed -i "s|\"o kawaii koto\"|\"$(openssl rand -base64 32)\"|" guyamoe/settings/base.py
```

6. Generate the default assets for Guyamoe.
```
python3 init.py
```

7. Create an admin user for Guyamoe.
```
python3 manage.py createsuperuser
```

8. Collect static files. Otherwise the admin static files won't be accessible.
```
python3 manage.py collectstatic
```

**Note:** Zero pad chapter folder numbers like so: `001` for the Kaguya series (this is how the fixtures data for the series has it). It doesn't matter for pages though nor does it have to be .jpg. Only thing required for pages is that the ordering can be known from a simple numerical/alphabetical sort on the directory.

### Start the server
This will host the website on localhost:8000
-  `python3 manage.py runserver` - Keep this console active, otherwise the server will be closed.

For some peopple the command above won't make the site accessible. In that case run:
-  `python manage.py runserver 0.0.0.0` - remember to replace `localhost` with your hosts internal IP in `./guyamoe/settings/local.py`, in order to add it to `ALLOWED_HOSTS`.

## Other info
### Relevant URLs: 

- `/` - home page
- `/about` - about page
- `/admin` - admin view (login with created user above)
- `/admin_home` - admin endpoint for clearing the site's cache
- `/reader/series/<series_slug_name>` - series info and all chapter links
- `/reader/series/<series_slug_name>/<chapter_number>/<page_number>` - url scheme for reader opened on specfied page of chapter of series.
- `/api/series/<series_slug_name>` - all series data requested by reader frontend
- `/media/manga/<series_slug_name>/<chapter_number>/<page_file_name>` - url scheme to used by reader to actual page as an image.

### Folder structure
Before starting the server, create a `media` folder in the base directory. Add manga with the corresponding chapters and page images. Structure it like so:
```
media
└───manga
    └───<series-slug-name>
        └───001
            ├───001.jpg
            ├───002.jpg
            └───...
```
E.g. `Kaguya-Wants-To-Be-Confessed-To` for `<series-slug-name>`. 
