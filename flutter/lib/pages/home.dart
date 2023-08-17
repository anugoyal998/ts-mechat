import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mechat_flutter/components/menudropdown.dart';
import 'package:mechat_flutter/components/search.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/config/url.dart';
import 'package:mechat_flutter/model/user.model.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:mechat_flutter/provider/currentChat.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:http/http.dart' as http;
import 'package:mechat_flutter/utils/imageurl.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<User> users = [];
  List<User> usersCopy = [];
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  void _fetchUsers() async {
    var client = http.Client();
    var url = Uri.parse("${ApiUrl().apiUrl}/api/allUsers");
    try {
      setState(() {
        isLoading = true;
      });
      SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
      String? accessToken = sharedPreferences.getString("accessToken");
      if (accessToken == "" || accessToken == null) {
        throw new Exception("Invalid access token");
      }
      print(accessToken);
      var response = await client.get(url, headers: <String, String>{
        'Authorization': "Bearer $accessToken",
        'Content-Type': 'application/json; charset=UTF-8'
      });
      var decodedResponse = jsonDecode(utf8.decode(response.bodyBytes)) as List;
      // print(decodedResponse[0]);
      // print(decodedResponse[0].runtimeType);
      // print(decodedResponse.runtimeType);
      setState(() {
        users = decodedResponse.map((e) => User.fromMap(e)).toList();
        usersCopy = decodedResponse.map((e) => User.fromMap(e)).toList();
      });
    } catch (e) {
      print(e);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void handleSearchChange(String value) {
    if (value == "") {
      setState(() {
        users = [...usersCopy];
      });
      return;
    }
    List<User> updatedUsers = [...usersCopy];
    updatedUsers.retainWhere(
        (element) => element.name!.toLowerCase().contains(value.toLowerCase()));
    setState(() {
      users = updatedUsers;
    });
  }

  @override
  Widget build(BuildContext context) {
    // print("${users.length} users");
    // print("${usersCopy.length} usersCopy");
    return Scaffold(
      appBar: AppBar(
        title: const Text("MeChat"),
        backgroundColor: AppColors.lightSecondary,
        automaticallyImplyLeading: false,
        actions: const <Widget>[MenuDropdown()],
      ),
      backgroundColor: AppColors.darkSecondary,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Search(
                onChanged: handleSearchChange,
              ),
              const SizedBox(
                height: 10,
              ),
              ...users.map((user) {
                if (user.username !=
                    Provider.of<Auth>(context, listen: false)
                        .getAuth()["username"]) return UserCard(user: user);
                return SizedBox(
                  width: 0,
                  height: 0,
                );
              })
            ],
          ),
        ),
      ),
    );
  }
}

class UserCard extends StatelessWidget {
  final User user;
  const UserCard({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        Provider.of<CurrentChat>(context, listen: false).setCurrentChat(user);
        Navigator.of(context).pushNamed(AppRoutes.chat);
      },
      child: Container(
        margin: const EdgeInsets.fromLTRB(0, 4, 0, 4),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            color: AppColors.lightSecondary),
        width: double.infinity,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              SizedBox(
                height: 64,
                width: 64,
                child: CircleAvatar(
                  radius: 56,
                  child: ClipOval(
                    child: Image.network(
                      imageURL(user.profilePhotoURL as String),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                "${user.name}",
                style: const TextStyle(color: AppColors.white),
              )
            ],
          ),
        ),
      ),
    );
  }
}
