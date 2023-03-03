const getStyles = () => ({
  title: {
    fontSize: 60,
    padding: '30px',
    marginBottom: '40px',
    color: 'white',
  },
});

const Title = () => {
  const styles = getStyles();

  return <h1 style={styles.title}>People and their cars</h1>;
};

export default Title;
