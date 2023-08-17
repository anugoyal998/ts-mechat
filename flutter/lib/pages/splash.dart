import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/config/url.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    // print("anubhav");
    authenticate().whenComplete(() async {
      Provider.of<Auth>(context, listen: false).isAuth()
          ? Navigator.of(context).pushReplacementNamed(AppRoutes.home)
          : Navigator.of(context).pushReplacementNamed(AppRoutes.login);
    });
    super.initState();
  }

  Future authenticate() async {
    // print("autenticate");
    final SharedPreferences sharedPreferences =
        await SharedPreferences.getInstance();
    String? accessToken = sharedPreferences.getString("accessToken");
    String? refreshToken = sharedPreferences.getString("refreshToken");
    // print(refreshToken);
    if (refreshToken == null || refreshToken == "") return;
    var url = Uri.parse("${ApiUrl().apiUrl}/api/refresh");
    var client = http.Client();
    try {
      var response = await client.post(url,
          body: jsonEncode({"refreshToken": refreshToken}),
          headers: ApiUrl().headers);
      var decodedResponse = jsonDecode(utf8.decode(response.bodyBytes)) as Map;
      print(decodedResponse);
      if (decodedResponse["accessToken"] != null &&
          decodedResponse["accessToken"] != "")
        Provider.of<Auth>(context, listen: false)
            .setAccessToken(decodedResponse["accessToken"]);
      if (decodedResponse["refreshToken"] != null &&
          decodedResponse["refreshToken"] != "")
        Provider.of<Auth>(context, listen: false)
            .setAccessToken(decodedResponse["refreshToken"]);
      if (accessToken != null)
        Provider.of<Auth>(context, listen: false).setAccessToken(accessToken);
      if (refreshToken != null)
        Provider.of<Auth>(context, listen: false).setAccessToken(refreshToken);
      Provider.of<Auth>(context, listen: false).setAuthFromAccessToken();
    } catch (e) {
      print(e);
    } finally {
      client.close();
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Text("Splash");
  }
}
