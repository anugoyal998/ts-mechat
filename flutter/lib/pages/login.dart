import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_keychain/flutter_keychain.dart';
import 'package:mechat_flutter/components/dialog.dart';
import 'package:mechat_flutter/components/textfield.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/config/url.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool isLoading = false;

  void loginHelper() async {
    if (_formKey.currentState!.validate()) {
      var url = Uri.parse("${ApiUrl().apiUrl}/api/login");
      Object body = {
        "provider": "emailPassword",
        "username": emailController.text.trim(),
        "password": passwordController.text.trim(),
        "repeat_password": passwordController.text.trim()
      };
      var client = http.Client();
      try {
        setState(() {
          isLoading = true;
        });
        var response = await client.post(url,
            body: jsonEncode(body), headers: ApiUrl().headers);
        var decodedResponse =
            jsonDecode(utf8.decode(response.bodyBytes)) as Map;

        // print(decodedResponse);
        // await FlutterKeychain.put(
        //     key: "accessToken", value: decodedResponse["accessToken"]);
        // await FlutterKeychain.put(
        //     key: "refreshToken", value: decodedResponse["refreshToken"]);
        final SharedPreferences sharedPreferences =
            await SharedPreferences.getInstance();
        sharedPreferences.setString(
            "accessToken", decodedResponse["accessToken"]);
        sharedPreferences.setString(
            "refreshToken", decodedResponse["refreshToken"]);
        Provider.of<Auth>(context, listen: false)
            .setAccessToken(decodedResponse["accessToken"]);
        Provider.of<Auth>(context, listen: false)
            .setRefreshToken(decodedResponse["refreshToken"]);
        Provider.of<Auth>(context, listen: false).setAuthFromAccessToken();
        // print(await FlutterKeychain.get(key: "refreshToken"));
        await showAlertDialog(context: context, title: "Login Success");
        Navigator.of(context).pushReplacementNamed(AppRoutes.home);
      } catch (e) {
        print(e);
      } finally {
        setState(() {
          isLoading = false;
        });
        client.close();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkSecondary,
      body: SingleChildScrollView(
        child: SizedBox(
            height: MediaQuery.of(context).size.height,
            child: Padding(
              padding: EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: double.infinity,
                    color: AppColors.lightSecondary,
                    child: Padding(
                      padding: EdgeInsets.all(24),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              "MeChat",
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            Text("Login to continue..."),
                            SizedBox(height: 16),
                            MyTextField(
                              hintText: "Email",
                              onChanged: (value) {},
                              obscureText: false,
                              controller: emailController,
                              validator: (value) {
                                if (value == null ||
                                    value.isEmpty ||
                                    !RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                                        .hasMatch(value)) {
                                  return 'Invalid Email';
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 12),
                            MyTextField(
                              hintText: "Password",
                              onChanged: (value) {},
                              obscureText: true,
                              controller: passwordController,
                              validator: (value) {
                                if (value == null ||
                                    value.isEmpty ||
                                    value.length < 6) {
                                  return "Password must be at least 6 characters";
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 20),
                            SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed:
                                    isLoading == false ? loginHelper : null,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: isLoading == false
                                      ? AppColors.primary
                                      : AppColors.darkSecondary,
                                  padding: EdgeInsets.all(20),
                                ),
                                child: Text(
                                  "Login",
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            SizedBox(height: 28),
                            Row(
                              children: [
                                Text("Don't have an account?"),
                                TextButton(
                                  onPressed: () {
                                    Navigator.of(context)
                                        .pushNamed(AppRoutes.register);
                                  },
                                  child: Text(
                                    "Register Here",
                                    style: TextStyle(
                                        decoration: TextDecoration.underline),
                                  ),
                                )
                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                  )
                ],
              ),
            )),
      ),
    );
  }
}
