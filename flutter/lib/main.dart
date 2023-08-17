import 'package:flutter/material.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:mechat_flutter/provider/currentChat.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider.value(value: Auth()),
    ChangeNotifierProvider.value(value: CurrentChat())
  ], child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        inputDecorationTheme: InputDecorationTheme(
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 2, color: AppColors.white),
            borderRadius: const BorderRadius.all(Radius.circular(32.0)),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 2, color: Colors.blue),
            borderRadius: const BorderRadius.all(Radius.circular(32.0)),
          ),
        )
      ),
      initialRoute: AppRoutes.splash,
      routes: AppRoutes.pages,
    );
  }
}
