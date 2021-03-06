import React, { useState } from 'react'
import { AppBar, InputBase, Toolbar, Typography } from '@material-ui/core'
import { Search as SearchIcon} from '@material-ui/icons'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

type Props = {
  movies: any
  setMovies: any
}

const Header: React.FC<Props> = props => { 
  
  const classes = useStyles()
  const [inputVal,setInputVal] = useState<string>("")

  function updateMovies(search: string) {
    //console.log("search: ", search)
    setInputVal(search)
    //console.log("prop movies: ",props.movies)
    props.setMovies(props.movies.filter((movie:any) => movie.title.toLowerCase().includes(search)))
  }
  
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Our Movie Store
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon} >
              <SearchIcon />
            </div>
            <InputBase
              classes={{ root:classes.inputRoot, input:classes.inputInput}}
              onChange={e=>updateMovies(e.target.value)}
              value={inputVal}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

        </Toolbar>
      </AppBar>
) 

}

export default Header