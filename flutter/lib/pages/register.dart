import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mechat_flutter/components/dialog.dart';
import 'package:mechat_flutter/components/textfield.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/config/url.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';


class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  bool isLoading = false;

  void registerHelper() async {
    if (_formKey.currentState!.validate()) {
      var url = Uri.parse("${ApiUrl().apiUrl}/api/register");
      Object body = {
        "provider": "emailPassword",
        "name": nameController.text.trim(),
        "username": emailController.text.trim(),
        "password": passwordController.text.trim(),
        "repeat_password": passwordController.text.trim(),
        "profilePhotoURL": "https://ui-avatars.com/api?background=random&name=${nameController.text.trim()}"
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
        await showAlertDialog(context: context, title: "Register Success");
        Navigator.of(context).pushReplacementNamed(AppRoutes.home);
      } catch (e) {
        print(e);
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
                            Text("Register to continue..."),
                            SizedBox(height: 16),
                            MyTextField(
                              hintText: "Name",
                              onChanged: (value) {},
                              obscureText: false,
                              controller: nameController,
                              validator: (value) {
                                if (value == null)
                                  return "Name must be atleast 3 characters long";
                                if (value.length < 3)
                                  return "Name must be atleast 3 characters long";
                                return null;
                              },
                            ),
                            SizedBox(height: 12),
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
                            SizedBox(height: 20),
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
                            MyTextField(
                              hintText: "Confirm Password",
                              onChanged: (value) {},
                              obscureText: true,
                              controller: confirmPasswordController,
                              validator: (value) {
                                if (value != passwordController.text) {
                                  return "Password and Confirm Password must be same";
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 20),
                            SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed:
                                    isLoading == false ? registerHelper : null,
                                style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    padding: EdgeInsets.all(20)),
                                child: Text(
                                  "Register",
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            SizedBox(height: 28),
                            Row(
                              children: [
                                Text("Already have an account?"),
                                TextButton(
                                  onPressed: () {
                                    Navigator.of(context)
                                        .pushNamed(AppRoutes.login);
                                  },
                                  child: Text(
                                    "Login Here",
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
