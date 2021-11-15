import React, { Component } from "react";
import { Button, TextInput, View, Text, StyleSheet} from "react-native";
import { ApolloProvider, Mutation, graphql} from "react-apollo";
import { ApolloClient,InMemoryCache,HttpLink} from "apollo-boost";
import gql from "graphql-tag";
import RNApp from "./RNApp";


/*  uri: "http://yourlocalhost:3000/graphql" */
const client = new ApolloClient({
                            link: new HttpLink({ uri: "http://127.0.0.1:3000/graphql" }),
                                cache: new InMemoryCache(), 
                              });
                              


export default class App extends Component {
    render() {    
        return (
          <ApolloProvider client={client}>
          <View style={styles.container}>
          <Text style={styles.title}> Hotel California Wast List</Text>
            </View>
            <RNApp/>
          </ApolloProvider>
          );
        }
      }



const styles = StyleSheet.create({
        title: {
          fontSize: 26,
          textAlign: 'center',
          margin: 10
        },
        container: {
          flex: 1,
          justifyContent: 'center',
        },
        subtitle: {
          fontSize: 20,
          textAlign: 'center',
          margin: 10
        },
        input: {
          backgroundColor: '#dddddd',
          height: 50,
          marginBottom: 15,
          paddingLeft: 10
        }
})


