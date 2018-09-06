import { Component } from '@angular/core';
import { ModalController, Platform, ToastController, AlertController} from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Flashlight } from '@ionic-native/flashlight';
import { Screenshot } from '@ionic-native/screenshot';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';
import { Contacts } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ListPage } from "../list/list";
import { ContactPage } from "../contact/contact";
import { BackgroundMode } from '@ionic-native/background-mode';
import { Autostart } from '@ionic-native/autostart';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    SpeechRecognition,
    TextToSpeech,
    Flashlight,
    Screenshot,
    BatteryStatus,
    Network,
    Contacts,
    CallNumber,
    SMS,
    LocalNotifications,
    HTTP,
    Geolocation,
    BackgroundMode,
    Autostart,
    BrowserTab,
    Camera,
    LaunchNavigator
  ]
})
export class HomePage {
  inputs=[];
  fridayOutput1 = "Hello, How Can I Help You?";
  userInput: boolean;
  contactlist: any;
  lat: any;
  long: any;
  city: String;

  constructor(public alertCtrl: AlertController,
              private speechRecognition: SpeechRecognition,
              private tts: TextToSpeech,
              private flashlight: Flashlight,
              public screenshot: Screenshot,
              private batteryStatus: BatteryStatus,
              public platform: Platform,
              private network: Network,
              private contacts: Contacts,
              private callNumber: CallNumber,
              private sms: SMS,
              private localNotifications: LocalNotifications,
              private http: HTTP,
              private geolocation: Geolocation,
              public toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private backgroundMode: BackgroundMode,
              private autostart: Autostart,
              private browserTab: BrowserTab,
              private camera: Camera,
              private launchNavigator: LaunchNavigator){
    this.autostart.enable();
    this.backgroundMode.enable();
    this.platform.ready().then(() => {
      this.read(this.fridayOutput1);
    });
  }

  onWriteInput(){
    let prompt = this.alertCtrl.create({
      title: 'Write Your Command',
      inputs: [
        {
          name: 'command',
          placeholder: 'Enter Command Here'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Run',
          handler: data => {
            this.input(data.command, true);
            this.work(data.command);
          }
        }
      ]
    });
    prompt.present();
  }


  startListening() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if(hasPermission) {
        this.speechRecognition.startListening({}).subscribe(matches => {
          this.input(matches[0], true);
          this.work(matches[0]);
        });
      } else {
        this.speechRecognition.requestPermission().then(() => {
            this.speechRecognition.startListening({}).subscribe(matches => {
              this.input(matches[0], true);
              this.work(matches[0]);
            });
          }, () => {
            this.read("Please, Give the Microphone Access to start listening to your command");
        })
      }
    });
  }

  work(ins) {
    let cmd = ins.toLowerCase();

    if(cmd == 'how are you' || cmd == 'how are you?') {
      this.read('I am Fine. Thank You');
    }
    else if(cmd == 'thank you') {
      let res = ['Welcome', 'Most Welcome Sir'];
      this.randomText(res, 2);
    }
    else if(cmd == 'what are you doing' || cmd == 'what are you doing?') {
      this.read('Just, Responding to Your Commands');
    }
    else if(cmd == 'who are you' || cmd == 'who are you?' || cmd == 'what is your name' || cmd == 'what is your name?') {
      this.read("I am Friday, Your Personal Virtual Assistant");
    }
    else if(cmd == 'what is the meaning of friday' || cmd == 'what is the meaning of friday?' || cmd == "what is friday" || cmd == "what is friday?" || cmd == "what is mean  by friday" || cmd == "what is mean by friday") {
      this.read("Friday was the assistant of Robinson Crusoe, and also the another name of Jarvis from popular movie Iron Man");
    }
    else if(cmd == 'bye' || cmd == 'good bye') {
      this.read("Good Bye");
    }
    else if(cmd == 'good night') {
      this.read("Have a sound sleep");
    }
    else if(cmd == 'tell me about battery status' || cmd == 'show me battery status') {
      this.battery();
    }
    else if(cmd == 'tell me about internet connection' || cmd == 'show me status of internet connection') {
      this.checkDataConnection();
    }
    else {
      let count = 0;
      let str = cmd.split(" ");
      let i = 0;

      for(i=0; i<str.length; i++) {
        if(str[i] == 'hey' || str[i] == 'hi' || str[i] == 'hello') {
          let hey = ['Hello, Sir', 'Hi, Sir'];
          this.randomText(hey, 2);
          count++;
          break;
        }
        else if (str[i] == "flash" || str[i] == "flashlight" || str[i] == "torch" || str[i] == "light" || str[i] == "torchlight") {
          this.flash(str);
          count++;
          break;
        }
        else if (str[0] == "take") {
          this.take(str);
          count++;
        }
        else if(str[0] == "call" || str[0] == "dial") {
          this.dialContact(str);
          count++;
          break;
        }
        else if(str[0] == "text" || str[0] == "message") {
          this.textContact(str);
          count++;
          break;
        }
        else if(str[0] == "reminder" || str[0] == "remind") {
          this.setReminder(str);
          count++;
          break;
        }
        else if(str[0] == "show") {
          this.showNear(str);
          count++;
          break;
        }
        else if(str[0] == 'weather') {
          let arr = str.slice(2);
          let text = arr.join(" ");
          this.weatherCheck(text);
          count++;
          break;
        }
        else if(str[0] == 'goto' || str[0] == 'open') {
          this.browser(str);
          count++;
          break;
        }
        else if(str[0] == 'where') {
          this.nav(str);
          count++;
          break;
        }
      }

      if(count == 0) {
        let myArray = ['Sorry, I did not understand your command',
          'Sorry, maybe this command is not available on this system',
          'Sorry, can you say that again properly?',
          'Sorry, I am not recognizing your command',
          'What you say? Can you please tell that again properly?'];

        this.randomText(myArray, 5);
      }
    }
  }

  randomText(arr, num) {
    let rand = Math.floor(Math.random() * num);
    this.read(arr[rand]);
  }

  read($event) {
    this.input($event, false);
    this.tts.speak({
      text: $event,
      locale: 'en-GB',
      rate: 0.85
    })
      .then(() => console.log('Yes its good'))
      .catch((reason: any) => console.log(reason));
  }

  input(value, name) {
    this.inputs.push(value);
    this.userInput = name;
  }

  flash(txt) {
    let j = 0;

    for(j=0; j<txt.length; j++) {
      if(txt[j] == "on" || txt[j] == "start") {
        if(this.flashlight.isSwitchedOn() == true) {
          this.read("Flashlight is already on");
          break;
        }
        else {
          this.read('Flash Light Turning On');
          this.flashlight.switchOn();
          break;
        }
      }
      else if(txt[j] == "off" || txt[j] == "of") {
        if(this.flashlight.isSwitchedOn() == false) {
          this.read("Flashlight is already off");
          break;
        }
        else {
          this.read('Flash Light Turning Off');
          this.flashlight.switchOff();
          break;
        }
      }
    }
  }

  weatherPop(name, temp, des){

    let prompt = this.alertCtrl.create({
      title: name.toUpperCase(),
      message: 'Temp: '+temp+' Celsius<br>Description: '+des.toUpperCase()
    });

    prompt.present().then (data => {
      this.read("Showing Weather Update");
    }).catch(error => {
      this.read("I am Sorry, Something went Wrong");
    });
  }

  take(str) {
    if(str[1] == "screenshot") {
      this.read('screenshot taken');
      this.screenshot.save('jpg', 80, 'friday_screenshot.jpg');
    }
    else if(str[1] == "picture" || str[1] == "photo") {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.read(base64Image);
      });
    }

    else if(str[1] == "selfie" || str[1] == "selfy" || str[1] == "selfi"){
      this.read("taking selfie");
      const options: CameraOptions = {
        cameraDirection: this.camera.Direction.FRONT,
        correctOrientation: true
      };
      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.read(base64Image);
      });
    }

    else {
      this.read('Sorry, maybe this command is not available on your system');
    }
  }

  battery() {
    this.batteryStatus.onChange().subscribe((status) => {
        console.log(status.level, status.isPlugged);
        this.read("Your Battery have "+status.level+" percent of charge");
    });
  }

  isOnline() {
    if(this.network.type === 'none'){
      return false;
    } else {
      return true;
    }
  }

  checkDataConnection() {
    if(this.isOnline() == true) {
      this.read("Your Internet Connection Is On");
    } else {
      this.read("Something went Wrong With Your Internet Connection");
    }
  }

  dial(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log("Dialing"))
      .catch(() => console.log('Error launching dialer'));
  }

  dialContact(str) {
    let arr = str.slice(1);
    let name = arr.join(" ");
    let opts = {
      filter : name,
      multiple: true,
      hasPhoneNumber: true,
      fields:  [ 'displayName', 'phoneNumbers' ]
    };

    this.contacts.find([ 'displayName', 'phoneNumbers' ],opts).then((contacts) => {
      this.contactlist = contacts;

      if(this.contactlist.length > 1) {
        const modal1 = this.modalCtrl.create(ContactPage, this.contactlist);
        modal1.present();

        this.read("Which One?");
      }
      else if(this.contactlist.length == 1) {
        this.dial(this.contactlist[0].phoneNumbers[0].value);
        this.read("Dialling To: "+name.toUpperCase());
      }
      else {
        this.read("Contact Name Not Found");
      }
    }, (error) => {
      this.read("Something went Wrong, Please Try Again");
    })
  }

  text(num, message) {
    let options={
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    };
    this.sms.send(num, message, options).then(() => {
      this.read("Text Message Is Sending");
    },() => {
      this.read("Message Sending Failed");
    });
  }

  textContact(str) {
    let arr = str.slice(3);
    let text = arr.join(" ");
    let opts = {
      filter : str[1],
      multiple: false,
      hasPhoneNumber: true,
      fields:  [ 'displayName', 'phoneNumbers' ]
    };

    this.contacts.find([ 'displayName', 'phoneNumbers' ],opts).then((contacts) => {
      this.contactlist = contacts;
      this.text(this.contactlist[0].phoneNumbers[0].value, text);
    }, (error) => {
      this.read("Contact Name Not Found!");
    })
  }

  setReminder(str) {
    let time = parseInt(str[3]);
    let totalTime = 1000*60*time;
    let text = str.slice(2).join(" ");

    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Reminder From Friday',
      at: new Date(new Date().getTime() + totalTime)
    });

    this.read("Schedule Set at "+text);
  }

  weatherCheck(city) {
    if(this.isOnline()) {

      this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=40104156866e26ca839c4d7a1d6551a6',
        {
          id: 1,
          message: 'test'
        }, {
          Authorization: 'OAuth2: token'
        })
        .then(data => {
          let json = JSON.parse(data.data);
          let temp = json.main.temp;
          let des = json.weather[0].description;

          this.weatherPop(city, temp, des);
        })
        .catch(error => {
          this.read("There Is Problem To Get Data From Server");
        });

    } else {
      let toast = this.toastCtrl.create({
        message: 'There Is Problem To Get Data From Server',
        duration: 3000,
        position: 'middle'
      });
      toast.present().then(data => {
        this.read("Please Check Your Internet Connection");
      });
    }
  }

  showNear(str) {
    let type = str[1];

    if(this.isOnline()) {

      this.geolocation.getCurrentPosition().then((resp) => {
        let loc = resp.coords.latitude+','+resp.coords.longitude;
        this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+loc+'&radius=1000&type='+type+'&key=AIzaSyCs9m3OkaI5nNGwdb8RBlDXpBa49TJINFc',
          {
            id: 1,
            message: 'test'
          }, {
            Authorization: 'OAuth2: token'
          })
          .then(data => {
            let json = JSON.parse(data.data);
            let name = json.results;

            const modal = this.modalCtrl.create(ListPage, name);
            modal.present();

            this.read('Showing Neared '+type.toUpperCase());
          })
          .catch(error => {
            this.read('Getting Error To Find Data From Server');
          });
      }).catch((error) => {
        this.read('Error To Get Your Location');
      });
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please Check Your Internet Connection',
        duration: 2500,
        position: 'top'
      });
      toast.present().then(data => {
        this.read("Please Check Your Internet Connection");
      });
    }
  }

  browser(str) {
    let url = 'http://'+str[1];
    this.browserTab.isAvailable().then((isAvailable: boolean) => {

        if (isAvailable) {
          this.browserTab.openUrl(url);
          this.read("Going To: "+url);
        } else {
          this.read("Browser Tab Is Not Available");
        }
      });
  }

  nav(str) {
    let arr = str.slice(2);
    let des = arr.join(" ");

    if(this.isOnline()) {

      this.geolocation.getCurrentPosition().then((resp) => {
        let loc = resp.coords.latitude+','+resp.coords.longitude;

        let options: LaunchNavigatorOptions = {
          start: loc
        };

        this.launchNavigator.navigate(des, options)
          .then(
            success => this.read('Launched navigator'),
            error => this.read('Error launching navigator')
          );
      }).catch((error) => {
        this.read('Error To Get Your Location');
      });
    } else {
      this.read("Please Check Your Internet Connection");
    }
  }


}
