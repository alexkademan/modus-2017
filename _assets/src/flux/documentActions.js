// import DocumentStore from './documentStore';

// let weeksGames;
// let game;

const DocumentActions = {
  init(stats: Array<Object>) {
    console.log(stats);
  },

  randomNumber(maxCount) {
    return Math.floor((Math.random() * maxCount));
  },

  findImgSize(imageWidth, imageHeight, containerWidth, containerHeight) {
    const size = [];

    if (imageWidth < containerWidth && imageHeight < containerHeight) {
      // smaller than the space it goes within.
      size.width = imageWidth;
      size.height = imageHeight;
    } else if (imageWidth > imageHeight) {
      // landscape ratio:
      const ratioHorizontal = containerWidth / imageWidth;
      size.height = imageHeight * ratioHorizontal;

      if (size.height > containerHeight) {
        // too tall for the space
        const ratioVertical = containerHeight / imageHeight;
        size.width = imageWidth * ratioVertical;
        size.height = containerHeight;
      } else {
        size.width = imageWidth * ratioHorizontal;
      }
    } else {
      // portrait ratio:
      const ratioVertical = containerHeight / imageHeight;
      size.width = imageWidth * ratioVertical;

      if (size.width > containerWidth) {
        // too wide for the space
        const ratioHorizontal = containerWidth / imageWidth;
        size.width = containerWidth;
        size.height = imageHeight * ratioHorizontal;
      } else {
        size.height = imageHeight * ratioVertical;
      }
    }
    return size;
  },
};

export default DocumentActions;
