import React from 'react';
import List from './List'; 
import AnimeList from './AnimeList';
import { useIonRouter,IonPage, IonContent, IonInput, IonButton } from '@ionic/react';



const LoginPage: React.FC = () => {

    //	Initializing router
    const router = useIonRouter();

    //	A simple, hard-coded navigation
	const navigator = () => {
		
		router.push("./AnimeList");


	}

   

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Login</h1>
        <form >
          <IonInput type="text" placeholder="User"></IonInput>
          <IonInput type="password" placeholder="Password"></IonInput>
          <IonButton expand="block" onClick={() => navigator()}>Login</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;