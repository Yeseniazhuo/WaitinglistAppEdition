import React, { Component } from "react";
import { Button, TextInput, View, Text, StyleSheet} from "react-native";
import { ApolloProvider, Mutation} from "react-apollo";
import { ApolloClient,InMemoryCache,HttpLink} from "apollo-boost";
import gql from "graphql-tag";

/*  uri: "http://yourlocalhost:3000/graphql" 
*/
const client = new ApolloClient({
                            link: new HttpLink({ 
                              uri: 'http://127.0.0.1:3000/graphql'}),
                            cache: new InMemoryCache(), 
                              });
                              
const addCus = gql`mutation customerAdd($customer: newCustomer!) {
      customerAdd(customer: $customer) {
        id name phone time
      }
    }`;


export default class App extends Component {
  constructor() {
    super();
    this.state =  { name: '', phone: '' };
  }
    render() {    
        return (
          <ApolloProvider client={client}>
          <View style={styles.container}>
          <Text style={styles.title}> Hotel California Wast List</Text>
          <Mutation mutation={addCus}>
            {(addMutation)=>
              (
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
                      addMutation({
                        variables: { customer: { name: this.state.name, phone: this.state.phone } },
                    })
                      .then((res)=>res)
                      .catch((err) => <text>{err}</text>)
                    this.setState({name:'',phone:''})
                      }}
                  />
                </View>
              )
            }
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
