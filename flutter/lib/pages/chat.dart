import 'package:flutter/material.dart';
import 'package:mechat_flutter/model/user.model.dart';
import 'package:mechat_flutter/provider/currentChat.dart';
import 'package:mechat_flutter/styles/app_colors.dart';
import 'package:mechat_flutter/utils/imageurl.dart';
import 'package:provider/provider.dart';

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    User currentChat =
        Provider.of<CurrentChat>(context, listen: false).getCurrentChat();
    return Scaffold(
      appBar: AppBar(
        title: Text("${currentChat.name}"),
        backgroundColor: AppColors.lightSecondary,
        actions: <Widget>[
          SizedBox(
            height: 48,
            width: 48,
            child: CircleAvatar(
              radius: 36,
              child: ClipOval(
                child: Image.network(
                  imageURL(currentChat.profilePhotoURL as String),
                ),
              ),
            ),
          ),
        ],
      ),
      backgroundColor: AppColors.darkSecondary,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Container(
                      height: 100,
                      color: Colors.red,
                      child: const Text("Anubhav"),
                    ),
                  ],
                ),
              ),
            ),
            Row(
              children: <Widget>[
                const Expanded(
                  child: TextField(
                    decoration:
                        InputDecoration(hintText: 'Write your message...'),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    padding: const EdgeInsets.all(14.0),
                  ),
                  child: const Icon(Icons.send_outlined),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
