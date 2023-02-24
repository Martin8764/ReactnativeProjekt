
import React, { useState, useEffect, Component } from "react";
import { StyleSheet, View, Button, Text, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';
import { SelectList } from 'react-native-dropdown-select-list'
import Pdf from 'react-native-pdf';

/*
function Levels({ navigation }) {
    return (
      <levels />
    );
  }
  */
  const stack = createNativeStackNavigator();

  const HomeScreen = ({navigation}) => {

    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Dice')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>Dice</Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('api')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>Weather</Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('news')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>News</Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('prog')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>Programming Cheat sheet</Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('cur')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>Currency Converter</Text>
      </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('todo')}>
      <View style={styles.square} >
      <Text style={styles.diceText}>Todo</Text>
      </View>
       </TouchableOpacity>
      
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.nameText}>Skill issue</Text>
      <TouchableOpacity>
      <Text style={styles.followText}>More</Text>
      </TouchableOpacity>
    </View>
    <Image
      style={styles.image}
      resizeMode="cover"
      source={{
        uri:
          "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80",
      }}
    />
    <View style={styles.footer}>
      <Text>
        <Text style={styles.nameText}>{`GG`}</Text>
      </Text>
    </View>
  </View>
</View>
)} 
      
const DiceScreen = ({navigation}) => {
  const [dce, setDice] = useState();
  const diceRoll = () => {
    var dice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (dice == 1) 
    {
      setDice('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEUAAAD////6+vrs7OzU1NT09PSdnZ3j4+PX19ehoaG9vb3o6OhbW1vDw8NRUVH39/eWlpaFhYXOzs6np6dmZmYUFBQlJSWtra3JyckPDw9JSUlVVVW0tLTd3d15eXl0dHQzMzMhISFpaWk0NDSOjo6n4h87AAAEjklEQVR4nO2daXuqMBBGRUEUrYJbXVu7/P/feG+XJGBNCHbIDPY9n6cPcwxNQnDGXg8AAAAAAAD5TPMsTpO+TJI0zvLpb/SKUdQFRsVteptH7swb8PjSXHDJnXRDlg39Vn3ujBvTXzUR7NINamgwjAvuXG9k6yvYjRn0GvGNI5gMpJJcpuo1itVJdDKe7XzHnoHdbDyp5Duu/5tp5SPZt5/kr9lvyynXb3HmJnhwCJAfBYeBSXpeF1xaJxYhkiOiNHfUrBlnE/kQJjciMpP4xhl41HGjQKlREevMj844s0IESowOs3K4oooGU5I0zCLgepg6dXGWUejZxvUPpj+GWbC86Jh53KavKmQSLi9C9O7G/hw1VCHDgHnR4ZH+gwrpymamyqF+KdcTzTpgXnSsVfona4ja3nVvMfxCLYkDa8S8NkI2aoTsu+/+nRj2rREwlA4MYSgfGMJQPjCEoXxgCEP5wBCG8oEhDOUDQxjKB4YwlA8MYSgfGMJQPjCEoXxgCEP5wBCG8oEhDOUDQxjKB4YwlA8MYSgffsPN8/twnBetVf4xGz5tTQ1kumylSJzTcGPKb7+ZPJFfhNNwfOn36Uhe5MhmeE6vCUZeDRAawWU4tfhF5AXjTIbPdsH/Uw7llZgMHSP4gb1U8AZYDM82NQVl6wYWw4nNTHNjK7JrcBheXSYuoCvJZTB88RAkvE8ZDP16hrmbkTSAwdBLMHqkulx4wyc/Q7LS8fCGvn3fqB6nwhv6tiak2p8GN3zzFCTbngY3dO5Iy1DdM8EN330NnX2PGhDccGgTuhtD/yavNNcLb5jfvWFhE7obw5WvINWTfvgV39eQ6ukivGH94+8XVA/B4Q1/HANbOBNdL7zhzKZUhew0iuH50HYUXIXsfJ/B0GtnStdZjOMkymcQ6V7RcBh6/CcSngmznJfWHyeSnUNxnerXNXh/JbwW05sZ97JPeOLN93bNNduQCvK9IX2w+ZHeoj3Ot9yWx6gT4STzCeN7/HX2029A/1UF1m+bvCyrv9Qweqa/Bvf3aXqHYfw5ryanrKC+P7/gNmwfGMJQPjCEoXxgCEP5wBCG8oEhDOUDQxjKB4YwlA8MYSgfGMJQPjCEoXxgCEP5wBCG8oEhDOUDQxjKB4YwlA8MYSgfGMJQPjCEoXzqDed3Yji3RqhCOrrK3LCospyJNeL0HUHYJC4ka5W+vWeRLqMj750ahINK396FQrfMGQbMi45xffq6GYn9RpaMmmiilT1GhXTyNjWV8Y4gXXi9CJYXHbr/nas5milnba2reGuYZrfO8mkd1b0lca5zd4aZjjJxoMSoMJ0Njs64jY6LskCp0VCqiK+pwC31WOvSKJZ6UyzrYs3tHCWOdUUUq1KduH3Xraj031608hMGxOwrbVI9FoFqv5U03+/aT/Jmdvu82nbDa7+5jS5IBlJJLlPd+n0w8eXfdQbvyfHHKHYEzxH8wL8vpyRq14kyK98mx3LoN13b/Nqpy8G9V7vK2bfroQSOb80FPyi6MavGv+o2Nc2zOE36MknSOMu79yQLAAAAAAD+Iv8AmVA4qmpAHaMAAAAASUVORK5CYII=');
      return dce;
    }
    else if (dice == 2)
    {
      setDice('data:image/png;base64,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');
      return dce;
    }
    else if (dice == 3)
   {
    setDice('data:image/png;base64,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');
    return dce;
    }
    else if (dice == 4)
    {
      setDice('data:image/png;base64,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');
      return dce;
    }
    else if (dice == 5)
    {
      setDice('data:image/png;base64,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');
      return dce;
    }
    else {
      setDice('data:image/png;base64,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');
      return dce;
    }
  }
  var image;
  if(dce === null || dce === undefined){
    image = 'data:image/png;base64,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';
  }
  else if (dce != null && dce != undefined){
  image = dce;
  }
  return(
      <View>
     <Image source={{uri:`${image}`}} style={styles.diceimage}/>
     <TouchableOpacity style={styles.currencyButton} onPress={() => diceRoll()}><Text style={styles.currencyText}>Roll The Dice!</Text></TouchableOpacity>
     </View>
  )

} 
  const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

export default function App() {
    const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  return (
   
      <NavigationContainer
       ref={navigationRef}>
       
     <stack.Navigator>
      <stack.Screen name ="Home" component={HomeScreen}  

      options={{title: 'Welcome'}}/>

<stack.Screen name ="Dice" component={DiceScreen}  


options={{title: 'Dice'}}/>

<stack.Screen name ="api" component={ApiScreen}  


options={{title: 'Weather'}}/>

<stack.Screen name ="news" component={NewsScreen}  


options={{title: 'News'}}/>

<stack.Screen name ="prog" component={ProgScreen}  


options={{title: 'prog'}}/>

<stack.Screen name ="cur" component={CurScreen}  


options={{title: 'cur'}}/>

<stack.Screen name ="todo" component={TodoScreen}  


options={{title: 'todo'}}/>



      
     </stack.Navigator>
     
       </NavigationContainer>
       )}
const NewsScreen = ({navigation}) => {
const [news, setNews] = useState([]);
useEffect(() => {
  const getArticles = () =>{
    return fetch("https://newsapi.org/v2/top-headlines?country=se&apiKey=501fc239c8084e1b8b61ae358e5329dc").then(response => response.json())
    .then(json => {
      setNews(json.articles);
      return news;
    })
  }
 getArticles();
}, []);
        return (
          <ScrollView>
          {
            news.map((item, index) => {
              return (
                <View>
                <Text> News {item.title} </Text>
                </View>
              )
            })
          }
          </ScrollView>
  );

}



const ApiScreen = ({navigation}) => { 
const [isLoading, setLoading] = useState(true);
const [isNoob, setNoob] = useState([]);
useEffect(() => {


getLocation().then((location) => {
			
getWeather({

	key: "eacd9fd614793dd1bbdee11553553eb5",
	lat: location.coords.latitude,
	lon: location.coords.longitude,
	unit: "metric"

}).then(() => {

	let data = new showWeather();
  setNoob(data);
  setLoading(false);
  return isNoob;
});
});
},[])
      return (
        <View>
        <Text> temp min {isNoob.temp_min} C</Text> 
        <Text> temp max {isNoob.temp_max} C</Text> 
        <Text> Wind {isNoob.wind} m/s</Text> 
        <Text> Humidity {isNoob.humidity} %</Text> 
        </View>
      )}





      const ProgScreen = ({navigation}) => {

          const source = { uri: 'https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf', cache: true };
          //const source = require('./test.pdf');  // ios only
          //const source = {uri:'bundle-assets://test.pdf' };
          //const source = {uri:'file:///sdcard/test.pdf'};
          //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
          //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
          //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
  
          return (
              <View style={styles.container}>
                  <Pdf
                      source={source}
                      onLoadComplete={(numberOfPages,filePath) => {
                          console.log(`Number of pages: ${numberOfPages}`);
                      }}
                      onPageChanged={(page,numberOfPages) => {
                          console.log(`Current page: ${page}`);
                      }}
                      onError={(error) => {
                          console.log(error);
                      }}
                      onPressLink={(uri) => {
                          console.log(`Link pressed: ${uri}`);
                      }}
                      style={styles.pdf}/>
              </View>
          )
      }

      const CurScreen = ({navigation}) => { 
      const [selected, setSelected] = React.useState("");
      const [Nooob, setNoob] = React.useState();
      const [Pro, setPro] = React.useState();
      const [Trash, setTrash] = React.useState();
      const [Skill, setSkill] = React.useState();
      const [Dog, setDog] = React.useState();

        var requestURL = 'https://api.exchangerate.host/latest'; 
        var request = new XMLHttpRequest(); 
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        useEffect(() => {
        request.onload = function() {
          var response = request.response;
          setSelected(response.rates);
          return selected;
        }
      },[])

        console.log(Object.keys(selected));
        ProPlayer = () => {
          const proplay = () => {
          return fetch(`https://api.exchangerate.host/convert?from=${Pro}&to=${Skill}`)
          .then (response => response.json())
          .then  (json => {
          setDog (json.result)
          return Dog;
          })
        }
        proplay();
        console.log(Dog);
        }
        return(
          <View>
          <SelectList
              data={Object.keys(selected)} 
              setSelected = {setNoob}
              onSelect = {() => setPro(Nooob)}
              save="value"
          />
                    <SelectList
              data={Object.keys(selected)} 
              setSelected = {setTrash}
              onSelect = {() => setSkill(Trash)}
              save="value"
          />
          
          <TouchableOpacity style={styles.currencyButton} onPress={() => ProPlayer()}>
            <Text>Calculate</Text>
          </TouchableOpacity>
          <Text>{Dog}</Text>
          </View>
        )

  
      };

      const TodoScreen = ({navigation}) => {
        return (
          <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.square} >
          <Text style={styles.diceText}>Baited</Text>
          </View>
          </TouchableOpacity>
          </View>
        )}
      
      
       
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    flexDirection:'row',
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 15,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: screen.width * 0.8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  image: {
    height: screen.width * 0.8,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  nameText: {
    fontWeight: "bold",
    color: "#20232a",
  },
  followText: {
    fontWeight: "bold",
    color: "#0095f6",
  },
  diceimage: {
    width: 200,
    height: 200,
  },
  currencyButton: {
    width: 100,
    height: 100,
    
  },
  diceText: {
    fontWeight: "bold",
    color: "#20232a",
  },
  currencyText: {
    fontWeight: "bold",
    color: "red",
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
},

});
