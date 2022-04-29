import React from "react";
import NewsCard from "../NewsCard/NewsCard.component";
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./NewsCards.styles.js";

const infoCards = [
  {
    // color: "#00838f",
    color: "#11be79",
    title: "Latest News",
    text: "Give me the latest news",
  },
  {
    // color: "#1565c0",
    color: "#b464e6",
    title: "News by Categories",
    info: "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    // color: "#4527a0",
    color: "#f2d45c",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with the PlayStation 5",
  },
  {
    // color: "#283593",
    color: "#073aab",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h6" style={{ fontSize: 26 }}>
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h6" style={{ fontSize: 15 }}>
                    <strong style={{ fontSize: 20 }}>
                      {infoCard.title.split(" ")[2]}:
                    </strong>
                    <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6" style={{ fontSize: 15 }}>
                  <p style={{ fontSize: 18 }}>Try Saying:</p>
                  <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <NewsCard activeArticle={activeArticle} article={article} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
