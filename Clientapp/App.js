import React, { Component } from "react";
import { Button, TextInput, View, Text, StyleSheet, Alert} from "react-native";
import { ApolloProvider, Mutation} from "react-apollo";
import { ApolloClient,InMemoryCache,HttpLink} from "apollo-boost";
import gql from "graphql-tag";
import { graphql } from "graphql";

/*  uri: "http://yourIPV4:3000/graphql" */
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.101.25/graphql'}),
  cache: new InMemoryCache(), 
    });
                              
export default class App extends Component {
    constructor() {
         super();
        this.state =  { name: "", phone: "" };
        }
    render() {
      const addCustomer = gql`mutation customerAdd($customer: newCustomer!) {
        customerAdd(customer: $customer) {
          id name phone time
        }
      }`;   
      const queryCustomer = gql`query {
        waitlist {
          id name phone time
        }
      }`;
      return (
          <ApolloProvider client={client}>
            <View style={styles.container}>
               <Text style={styles.title}> Hotel California Wast List</Text>
               <Mutation mutation={addCustomer}>
                 {(addMutation)=>(
                  <View>
                    <Text style={styles.subtitle}>Add new Customer:</Text>
                    <TextInput 
                      style={styles.input}
                      onChangeText={(text) => this.setState({ name: text })}
                      value={this.state.name}
                      placeholder="Customer Name"
                    />
                    <TextInput 
                      style={styles.input}
                      onChangeText={(text) => this.setState({ phone: text })}
                      value={this.state.phone}
                      placeholder="Customer Phone Number"
                      keyboardType='numeric'
                     />
                    <Button
                      title="Submit"
                      onPress={() => {       
                        const newCustomer = { name: this.state.name, phone: this.state.phone }
                        Alert.alert('Adding to the mongoDB');              
                        addMutation({
                        variables: { customer: newCustomer },
                                  });
                        this.setState({name:'',phone:''});}
                      }
                    />
                  </View>
                  )}
                </Mutation>
             </View>  
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
