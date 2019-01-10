# template_Test_Tweb

#### serveur



1. **RECUPERER LES FILMS**



  Ajout de la liste des films dans une base de données local, (impossible en remote sur atlas)

![1547124751599](./img_readme/1547124751599.png)



2. **API**

   Utilisation de graphql pour la récupération des movies.

   aller sur : 

   - http://<monURl>/graphql

   - (http://localhost:2000/graphql)

   ```json
   {
     getMovies(begin: 11, number: 30){
       vote_count
       video
       vote_average
       title
       popularity
       poster_path
       original_language
       original_title
       backdrop_path
       adult
       overview
       release_date
       tmdb_id
     }
   }
   ```

   - Begin = entrée par laquelle on commence à récupérer les données.
   - Number = nombre de films que l'on récupère.

3. **AUTHENTICATION**

- Via le frontend vous avez un formulaire pour enregister un compte
- Via le frontend vous avez un formulaire pour vous connecter



- Création du user via une requête graphQL

  ```json
  mutation{
    createUser(input:{
      password : "bittteeeeee",
      name: "Prout",
      lastName: "Yann",
      email: "yannlederrey@gmail.com"
    })
    {
      _id
    }
  }
  ```


- Connection via une reqête sur l'API rest /auth/login



4. **List de movie vues**



Pour récupérer les films on va sur le endpoint graphql getUser : 

```json
{
   getUser(_id: "5c374a081f18d748ae1e6153") {
    moviesWatches {
      vote_count
      video
      vote_average
      title
      popularity
      poster_path
      original_language
      original_title
      backdrop_path
      adult
      overview
      release_date
      tmdb_id
    }
  }
}
```

Pour modifier : 

```json
mutation{
  updateUser(_id: "5c374a081f18d748ae1e6153" input:{
    moviesWatches : ["5c373fdaf0fbcb6d4d0516eb", "5c373fdaf0fbcb6d4d0516e7"]
  })
  {
    _id
    moviesWatches {
      vote_count
      video
      vote_average
      title
      popularity
      poster_path
      original_language
      original_title
      backdrop_path
      adult
      overview
      release_date
      tmdb_id
    }
  }
}
```

- _id correspond à l'id du user et les autres id correspondents à ceux des movies.