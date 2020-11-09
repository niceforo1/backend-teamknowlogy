# Backend Teamknowlogy

Esta es la resolución a una test solicitado por la empresa Teamknology. Es un proyecto Backend realizado en Node.js y utlizando Mongo DB como base de datos.

## Instalación

Para la instalación realice los siguientes pasos:

```bash
git clone

cd  backend-teamknowlogy

npm install
```

## Uso

### Pasos Previos

Es necesario contar con un archivo .env en la raíz del proyecto para realizar los seteos generales y necesarios para la aplicación. Para este caso necesitamos la url de conexión de una base Mongo DB.

```
DB_CONN=[URL_MONGO_DB_CONNECTION]
PORT=[Puerto en el cual se iniciará la aplicación, por defecto es el ]
```

Para correr localmente en modo de **desarrollo** realizar lo siguiente.

```bash
npm run dev
```

Para correr localmente en modo de **producción** realizar lo siguiente.

```bash
npm start
```

## Explicación de uso

El proyecto cuenta con dos endpoints:

- **/mutations** de verbo POST el cual recibe un dentro del body un atributo requerido **dna** que es un array de strings, para validar si un ADN presenta una mutación.
  En caso de verificar una mutación, retorna un HTTP 200-OK, en caso contrario un 403-Forbidden

### Ejemplo de CURL

```
curl --location --request POST '[URL_APPLICATION]:[PORT_APPLICATION]/mutation' \
--header 'Content-Type: application/json' \
--data-raw '{"dna":["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]}'
```

- **/stats** en el cual se va a poder visualizar las estadísticas de las verificaciones de ADN:
  Retorna el siguiente JSON.

```
{“count_mutations”:40, “count_no_mutation”:100: “ratio”:0.4}
```
