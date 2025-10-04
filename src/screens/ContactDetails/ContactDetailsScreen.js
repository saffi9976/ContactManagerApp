import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';
import {formatContactName} from '../../data/contactsData';

const ContactDetailsScreen = ({route, navigation}) => {
  const {contactId} = route.params;
  const {contacts, toggleFavorite, deleteContact} = useContacts();
  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Contact not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteContact(contact.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {contact.avatar ? (
            <Image source={{uri: contact.avatar}} style={styles.largeAvatar} />
          ) : (
            <View style={styles.largeAvatarPlaceholder}>
              <Text style={styles.largeAvatarText}>
                {`${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.name}>{formatContactName(contact)}</Text>
          <Text style={styles.company}>{contact.company || 'No company'}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>{contact.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="email" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>{contact.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="notes" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>{contact.notes || 'No notes'}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => toggleFavorite(contact.id)}>
            <Icon
              name={contact.favorite ? 'star' : 'star-border'}
              size={30}
              color={contact.favorite ? Colors.secondary : Colors.text.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddContact', {contact})}>
            <Icon name="edit" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="delete" size={30} color={Colors.accent} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  header: {
    ...GlobalStyles.centered,
    marginBottom: Spacing.lg,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  largeAvatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  largeAvatarText: {
    color: Colors.text.light,
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  company: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
  detailsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ContactDetailsScreen;