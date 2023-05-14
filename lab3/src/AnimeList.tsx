import React from 'react';
import { IonAvatar, IonList, IonItem, IonLabel, IonContent } from '@ionic/react';

interface AnimeData {
  data: {
    genres: {
      mal_id: number;
      name: string;
      type: string;
      url: string;
    }[];
  };
}

const AnimeList: React.FC = () => {
  const [genres, setGenres] = React.useState<AnimeData['data']['genres']>([]);

  React.useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/anime')
      .then((response) => response.json())
      .then((data: AnimeData) => {
        if (data.data.genres) {
          setGenres(data.data.genres);
        } else {
          console.error('Genres not found in JSON data');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <IonContent>
      <IonList>
        {genres.map((genre) => (
        

          <IonItem key={genre.mal_id}>
            <IonAvatar slot="start">
            <img src={'https:\/\/img.youtube.com\/vi\/rS228HesD9g\/sddefault.jpg'} alt="avatar" />
            </IonAvatar>
            
            <IonLabel>{genre.name}</IonLabel>
            <IonLabel>{genre.type}</IonLabel>
            <IonLabel>{genre.mal_id}</IonLabel>
            <IonLabel>{genre.url}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default AnimeList;



