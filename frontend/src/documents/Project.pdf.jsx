import React from 'react';
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { GrDocumentPdf } from 'react-icons/gr';
import { borderColor, borderWidth } from 'polished';

// Create Document Component
const ProjectDocument = (projectDetails) => {
  const project = projectDetails.projectDetails.projectDetails.project;
  const requirements =
    projectDetails.projectDetails.projectDetails.requirements;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{project.name}</Text>
          <View style={styles.cardDetails}>
            <View style={styles.card}>
              <Text style={styles.cardTile}>Data de Criação</Text>
              <Text style={styles.cardDescription}>{project?.createdAt}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTile}>Responsável</Text>
              <Text style={styles.cardDescription}>{project?.owner.name}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTile}>Previsão de Entrega</Text>
              <Text style={styles.cardDescription}>
                {project?.fromattedDeliveryDate}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsSubTitle}>Descrição</Text>
          <Text style={styles.detailsDescription}>{project?.description}</Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.detailsSubTitle}>Requisitos</Text>
          {requirements.map((req) => (
            <View key={req.id} style={styles.requirementWrapper}>
              <View style={styles.requirementContainer}>
                <View style={styles.requirementDetails}>
                  <Text style={styles.requirementDetailsTitle}>{`${req.requirement_id} - ${
                    req.non_function ? 'RNF' : 'RF'
                  }`}</Text>
                  <Text style={styles.requirementDetailsDescription}>{req.name}</Text>
                </View>
                <View style={styles.requirementDetails}>
                  <Text style={styles.requirementDetailsTitle}>Prioridade</Text>
                  <Text style={styles.requirementDetailsDescription}>{req.priority.name}</Text>
                </View>
                <View style={styles.requirementDetails}>
                  <Text style={styles.requirementDetailsTitle}>Complexidade</Text>
                  <Text style={styles.requirementDetailsDescription}>{req.complexity.name}</Text>
                </View>
                <View style={styles.requirementDetails}>
                <Text style={styles.requirementDetailsTitle}>Situação</Text>
                <Text style={styles.requirementDetailsDescription}>{req.situation.name}</Text>
                </View>
                </View>

                <Text style={styles.requirementDescription}>{req.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    display: 'flex',
    alignContent: 'center',
    padding: 20,
  },
  section: {
    alignContent: 'center',
  },
  cardDetails: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    alignSelf: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    padding: '20px',
    backgroundColor: 'rgba(81, 150, 255, 1)',
    borderRadius: '20px',
    alignContent: 'center',
    justifyContent: 'center',
    width: '280px',
  },
  cardTile: {
    color: '#fff',
    fontSize: '18px',
    marginBottom: '8px',
  },
  cardDescription: {
    color: '#fff',
    fontSize: '15px',
  },
  detailsSubTitle: {
    alignSelf: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  detailsDescription: {
    width: '100%',
    fontSize: '12px',
    marginBottom: '40px',
  },
  requirementWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: '1px',
    marginBottom: 20,
  },
  requirementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  requirementDescription: {
    borderTopColor: 'grey',
    borderTopWidth: '1px',
  },
  requirementDetailsTitle: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  requirementDetailsDescription: {
    fontSize: '18px',
  }
});

const ProjectToPdf = (projectDetails) => {
  return (
    <div className="exportButton">
      <PDFDownloadLink
        style={{ right: 40, top: 30, position: 'absolute' }}
        document={<ProjectDocument projectDetails={projectDetails} />}
        fileName={`${projectDetails.projectDetails.project.name}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : <GrDocumentPdf size={20} />
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ProjectToPdf;
