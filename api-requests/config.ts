interface Config_Interface {
    API_DOMAIN_URL: string;
    GOOGLE_API_KEY: string;
    SOCKET_URL: string;
  }
  
  class Config implements Config_Interface {
    API_DOMAIN_URL: string = "https://xlr-ai.com";
    GOOGLE_API_KEY: string = "AIzaSyA9LQIZrsAqgJ4HTa3SLRB9eeoDc45Vy8o"; 
    SOCKET_URL: string = "https://xlr-ai.com";
  
  }
  
  const config: Config = new Config();
  
  export default config;
  export const origin = "https://xlr-ai.com";
  export const userCookie = "userToken";
  