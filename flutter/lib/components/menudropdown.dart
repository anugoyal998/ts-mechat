import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:mechat_flutter/config/app_routes.dart';
import 'package:mechat_flutter/provider/auth.dart';
import 'package:provider/provider.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MenuDropdown extends StatefulWidget {
  const MenuDropdown({super.key});

  @override
  State<MenuDropdown> createState() => _MenuDropdownState();
}

class _MenuDropdownState extends State<MenuDropdown> {
  @override
  Widget build(BuildContext context) {
    final String profilePhotoURL = Provider.of<Auth>(context, listen: false)
        .getAuth()["profilePhotoURL"] as String;
    return DropdownButtonHideUnderline(
      child: DropdownButton2(
        customButton: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Image.network("${profilePhotoURL}&size=64&rounded=true"),
        ),
        items: [
          ...MenuItems.firstItems.map(
            (item) => DropdownMenuItem<MenuItem>(
              value: item,
              child: MenuItems.buildItem(item),
            ),
          ),
          ...MenuItems.secondItems.map(
            (item) => DropdownMenuItem<MenuItem>(
              child: MenuItems.buildItem(item),
              value: item,
            ),
          )
        ],
        onChanged: (value) {
          MenuItems.onChanged(context, value! as MenuItem);
        },
        dropdownStyleData: DropdownStyleData(
          width: 160,
          padding: const EdgeInsets.symmetric(vertical: 6),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(4),
            color: AppColors.lightSecondary,
          ),
          offset: const Offset(0, 10),
        ),
      ),
    );
  }
}

class MenuItem {
  const MenuItem({
    required this.text,
    required this.icon,
  });

  final String text;
  final IconData icon;
}

abstract class MenuItems {
  static const List<MenuItem> firstItems = [settings];
  static const List<MenuItem> secondItems = [logout];

  static const home = MenuItem(text: 'Home', icon: Icons.home);
  static const share = MenuItem(text: 'Share', icon: Icons.share);
  static const settings = MenuItem(text: 'Settings', icon: Icons.settings);
  static const logout = MenuItem(text: 'Log Out', icon: Icons.logout);

  static Widget buildItem(MenuItem item) {
    return Row(
      children: [
        Icon(item.icon, color: Colors.white, size: 22),
        const SizedBox(
          width: 10,
        ),
        Expanded(
          child: Text(
            item.text,
            style: const TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }

  static void onChanged(BuildContext context, MenuItem item) async {
    switch (item) {
      case MenuItems.home:
        //Do something
        break;
      case MenuItems.settings:
        Navigator.of(context).pushNamed(AppRoutes.settings);
        break;
      case MenuItems.share:
        //Do something
        break;
      case MenuItems.logout:
        print("Logout");
        SharedPreferences sharedPreferences =
            await SharedPreferences.getInstance();
        sharedPreferences.clear();
        Provider.of<Auth>(context, listen: false).clearAuth();
        Navigator.of(context)
            .pushNamedAndRemoveUntil(AppRoutes.splash, (route) => false);
        break;
    }
  }
}
