import React, { Component } from "react";
import { ActivityIndicator, TextInput, View, Text } from "react-native";
import { ApolloProvider, Query, Mutation} from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

/*  uri: "http://yourlocalhost:3000/graphql" */
const client = new ApolloClient({ 
                                uri: "http://127.0.0.1:3000/graphql",
                                cache: new InMemoryCache(), 
                              });

const addCus = gql`mutation customerAdd($customer: newCustomer!) {
  customerAdd(customer: $customer) {
    id name phone time
  }
}`;

const queryCus = gql`query {
  waitlist {
    id name phone time
  }
}`;

export default class App extends Component {
    state={ name:'',phone:'' }
    render() {
        return (
          <ApolloProvider client={client}>
          <view style={styles.container}>
          <Text style={styles.subtitle}> Hotel California Wast List</Text>
                    <Mutation mutation={addCus} refetchQueries={[{ query: queryCus }]}>
            {
              (addMutation, {data})=>
              (
                <view>
                  <Text>Add new Customer:</Text>
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
                  />
                  <Button
                  onPress={()=>{
                    const customer={name:this.state.name,phone=this.state.phone}
                    addMutation({
                      variables:{customer:customer},
                    })
                    .then((res)=>res)
                    .catch((err)=><text>{err}</text>)
                  }}
                  />
                </view>
              )
            }
          </Mutation>
          </view>
          </ApolloProvider>
          );
        }
      }

const styles = StyleSheet.create({
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
          margin: 20,
          marginBottom: 0,
          paddingLeft: 10
        }
      })

