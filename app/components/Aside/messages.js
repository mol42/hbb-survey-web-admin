/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  home: {
    id: 'survey.components.Header.home',
    defaultMessage: 'Ana Sayfa',
  },
  surveyManagement: {
    id: 'survey.components.Header.surveyManagement',
    defaultMessage: 'Anket Yönetimi',
  },  
  reportScreenLink : {
    id : 'survey.components.Header.reportScreenLink',
    defaultMessage : 'Raporlama Ekranı'
  },
  logoutButton : {
    id : "survey.components.Aside.logoutButton",
    defaultMessage : "Çıkış"
  },
  passiveSurveys : {
    id : "survey.components.Aside.passiveSurveys",
    defaultMessage : "Pasif Anketler"
  },
  userListLink : {
    id : "survey.components.Aside.userList",
    defaultMessage : "Kullanıcılar"
  }
});
