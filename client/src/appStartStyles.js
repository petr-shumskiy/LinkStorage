const { makeStyles } = require('@material-ui/core/styles')

const authStyle = makeStyles((theme) => ({
  startHeader: {
    padding: '10px 15px 7px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  logo_first: {
    color: 'red'
  },

  signInBtn: {
    fontSize: '1rem',
    background: 'none',
    outline: 'none',
    alignSelf: 'center'
  },

  createAccount: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  createAccBtn: {
    //   font-size: 1.5rem;
    wordBreak: 'keep-all',
    //   line-height: 2.5rem;
    //   max-height: 52px;
    //   transition: all 100ms cubic-bezier(0.23, 1, 0.32, 1);
    //   padding: 0.25rem 1.875rem 0.4rem;
    color: '#0074bf',
    //   border: 1px solid #0074bf;
    //   border-radius: 5px;
    // backgroundColor: 'transparent'
    //   outline: none;
    '&:hover': {
      color: 'white',
      backgroundColor: '#0074bf'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '400px'
    }
  }
}))

export default authStyle
