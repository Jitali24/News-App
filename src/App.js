import React, { useEffect, useState } from 'react'
import NewsCards from './components/NewsCards/NewsCards.component'
import Footer from './components/Footer/Footer'
import alanBtn from '@alan-ai/alan-sdk-web'
import useStyles from './app.styles.js'
import wordsToNumbers from 'words-to-numbers'
import Modal from './components/Modal/Modal.component'
import { Typography } from '@material-ui/core'
import AlanLogo from './robo.gif'

const App = () => {
  const classes = useStyles()
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const alanKey =
    '2ccc98d380d7b8343b498370064118572e956eca572e1d8b807a3e2338fdd0dc/stage'

  // my key
  // const alanKey =
  //   "556fefb8711ed8e93b498370064118572e956eca572e1d8b807a3e2338fdd0dc/stage";

  useEffect(() => {
    let alanBtnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newsHeadlines') {
          // console.log('these are the articles: ', articles);
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if (command === 'instructions') {
          setIsOpen(true)
        } else if (command === 'highlight') {
          setActiveArticle((prevactiveArticle) => prevactiveArticle + 1)
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
          const article = articles[parsedNumber - 1]

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again!')
          } else if (article) {
            window.open(article.url, '_blank')
            alanBtn().playText('Opening')
          } else {
            alanBtn().playText('Please try that again!')
          }
        }
      },
      // onConnectionStatus: async function (status) {
      //   if (status === 'authorized') {
      //     await alanBtnInstance.activate()
      //     alanBtnInstance.playText(
      //       'Welcome to the Alan AI News Reader Application'
      //     )
      //   }
      // },
    })
  }, [])

  // <img src={AlanLogo} className={classes.alanLogo} alt='Alan Logo' />
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 18 }}>
                Try saying: <br />
                <br />
                Open the article number 2 or 3 or 4 etc
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 18 }}>
                Try saying: <br />
                <br />
                Go back
                <br />
                or
                <br />
                Give me the Instructions
              </Typography>
            </div>
          </div>
        ) : null}
        <img src={AlanLogo} className={classes.alanLogo} alt='logo' />
      </div>{' '}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </div>
  )
}

export default App
