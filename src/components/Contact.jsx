import React from 'react';
import { Box, Text, HStack, VStack, Image, UnorderedList, ListItem, Heading, Button} from '@chakra-ui/react';
import styles from '../pages/StylePage';
import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';
import Footer from './Footer';



const InformationAndContactPage = () => {
    const contactGegevens = {
        bedrijfsnaam: "Leer & Ontwikkel GGZ",
        adres: "123 Hoofdstraat, Stadsvilla",
        email: "info@leerontwikkelggz.nl",
        telefoon: "+31 12 345 6789",
    };

    return (
        <div>
        <Box style={styles.pageContainer}>
        <Box style={styles.container}>
        <Heading as="h1" mb="4" fontSize="2xl">Informatie & Contact Pagina</Heading>
            <HStack spacing="4" mb="4">
          <Image
            src="https://s3-storage.textopus.nl/wp-content/uploads/2015/01/18070912/shutterstock_129031994.jpg"
            alt="Image 1"
            style={{
                width: '30%',
                height: '150px', 
                objectFit: 'cover',
                borderRadius: '8px',
                border: '2px solid white',
                marginBottom: '16px',
              }}
          />
          <Image
            src="https://www.medischcontact.nl/upload/ca371a92-e403-411c-a345-b9b9c7a3b513_image9156973333157885166.jpg"
            alt="Image 2"
            style={{
                width: '30%',
                height: '150px', 
                objectFit: 'cover',
                borderRadius: '8px',
                border: '2px solid white',
                marginBottom: '16px',
              }}
          />
          <Image
            src="https://www.medilex.nl/site/images/cache/401/301/Congresses-3135-attachment1_Plaatjewebsite.jpg"
            alt="Image 3"
            style={{
                width: '30%',
                height: '150px', 
                objectFit: 'cover',
                borderRadius: '8px',
                border: '2px solid white',
                marginBottom: '16px',
              }}
          />
          </HStack>

<Text mb={4}>
  Op deze pagina kun je eenvoudig nieuwe cursussen toevoegen aan het Leren & Ontwikkelen in de GGZ-platform. Ontdek hier hoe je nieuwe cursussen kunt toevoegen en beheren op het platform voor Leren & Ontwikkelen in de GGZ.   Leer hoe je eenvoudig relevante informatie invoert en je bijdrage levert aan een groeiende educatieve community!
</Text>
<Text mb={4}>
Hier zijn de stappen om een cursus toe te voegen:
</Text>
<UnorderedList>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Navigeer naar "Cursus Toevoegen"
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Klik op de knop "Cursus Toevoegen" om te beginnen met het invoeren van gegevens voor je nieuwe cursus.
    </Text>
  </ListItem>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Vul de Cursusinformatie in
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Voer de vereiste gegevens in, zoals titel, beschrijving, starttijd, eindtijd, categorieën, instructeur en instructeursafbeelding.
      Je kunt optionele velden ook invullen om meer details toe te voegen.
    </Text>
  </ListItem>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Kies Categorieën"
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Selecteer de relevante categorieën voor je cursus, zoals "geestelijke gezondheid", "kind en jeugd" of "professionele ontwikkeling".
    </Text>
  </ListItem>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Docent informatie
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Voer de naam van de instructeur in en voeg indien mogelijk een afbeelding toe voor een persoonlijk tintje.
    </Text>
  </ListItem>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Bewaar je nieuwe Cursus
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Klik op "Opslaan" om je nieuwe cursus aan het platform toe te voegen.
    </Text>
  </ListItem>
  <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
    Bekijk je resultaat
    <Text mb={8} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
      Zodra opgeslagen, kun je de details van je nieuwe cursus bekijken op de hoofdpagina.
    </Text>
    <Text mb={8} fontStyle="italic">
          Zodra je het cursusformulier hebt ingevuld, nemen we zo snel mogelijk contact met je op om alle
          details met betrekking tot locatie, prijs, website en een inspirerende quote met je te bespreken.
          We kijken ernaar uit om samen met jou aan je leerreis te beginnen!
        </Text>
        <Text mb={10} fontStyle="italic">
          {' '}
          We kijken ernaar uit om samen met jou aan je leerreis te beginnen!
        </Text>
  </ListItem>
</UnorderedList>
<Heading  as="h2" mb="2" fontSize="lg">
            Contactgegevens:
          </Heading>
          <VStack spacing={2} align="flex-start" mb={4}>
            <Text>
              <strong>Bedrijfsnaam:</strong> {contactGegevens.bedrijfsnaam}
            </Text>
            <Text>
              <strong>Adres:</strong> {contactGegevens.adres}
            </Text>
            <Text>
              <strong>Email:</strong> {contactGegevens.email}
            </Text>
            <Text>
              <strong>Telefoon:</strong> {contactGegevens.telefoon}
            </Text>
          </VStack>
          <HStack spacing={5}>
      <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
        Facebook
      </Button>
      <Button colorScheme='pink' leftIcon={<FaInstagram />}>
        Instagram
      </Button>
      <Button colorScheme='linkedin' leftIcon={<FaLinkedin />}>
        LinkedIn
      </Button>
    </HStack>
</Box>
</Box>
<Footer />
</div>

  );
};

export default InformationAndContactPage;