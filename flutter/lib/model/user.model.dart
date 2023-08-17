import 'dart:convert';

class User {
  String? id;
  String? username;
  String? name;
  String? profilePhotoURL;
  User({
    this.id,
    this.username,
    this.name,
    this.profilePhotoURL,
  });

  User copyWith({
    String? id,
    String? username,
    String? name,
    String? profilePhotoURL,
  }) {
    return User(
      id: id ?? this.id,
      username: username ?? this.username,
      name: name ?? this.name,
      profilePhotoURL: profilePhotoURL ?? this.profilePhotoURL,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'username': username,
      'name': name,
      'profilePhotoURL': profilePhotoURL,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] != null ? map['_id'] as String : null,
      username: map['username'] != null ? map['username'] as String : null,
      name: map['providers'] != null && map['providers'].length > 0
          ? map['providers'][0]['name'] as String
          : null,
      profilePhotoURL: map['providers'] != null && map['providers'].length > 0
          ? map['providers'][0]['profilePhotoURL'] as String
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'User(id: $id, username: $username, name: $name, profilePhotoURL: $profilePhotoURL)';
  }

  @override
  bool operator ==(covariant User other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.username == username &&
        other.name == name &&
        other.profilePhotoURL == profilePhotoURL;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        username.hashCode ^
        name.hashCode ^
        profilePhotoURL.hashCode;
  }
}
