const config = `
<View>
  <Video name="video" value="$url" sync="v1" />
  <Audio name="audio" value="$url" hotkey="space" sync="v1" />
  <Header value="Sentiment"/>
  <ParagraphLabels name="label" toName="text">
    <Label value="General: Positive" background="#00ff00"/>
    <Label value="General: Negative" background="#ff0000"/>
    <Label value="Company: Positive" background="#7dff7d"/>
    <Label value="Company: Negative" background="#ff7d7d"/>
    <Label value="External: Positive" background="#4bff4b"/>
    <Label value="External: Negative" background="#ff4b4b"/>
  </ParagraphLabels>
  <View style="height: 400px; overflow-y: auto">
    <Header value="Transcript"/>
    <Paragraphs audioUrl="$url" name="text" value="$text" layout="dialogue" textKey="text" nameKey="author" showplayer="true" sync="v1" />
  </View>
</View>
`;

const data = {
  url: '/files/opossum_snow.mp4',
  text: [
    {
      'end': 5.6,
      'text': 'Dont you hate that?',
      'start': 3.1,
      'author': 'Mia Wallace',
    },
    {
      'text': 'Hate what?',
      'start': 4.2,
      'author': 'Vincent Vega:',
      'duration': 3.1,
    },
    {
      'text': 'Uncomfortable silences. Why do we feel its necessary to yak about bullshit in order to be comfortable?',
      'author': 'Mia Wallace:',
    },
    {
      'text': 'I dont know. Thats a good question.',
      'start': 90,
      'author': 'Vincent Vega:',
    },
    {
      'text': 'Thats when you know you found somebody really special. When you can just shut the fuck up for a minute, and comfortably share silence.',
      'author': 'Mia Wallace:',
    },
  ],
};

const annotations = [
  {
    'value': {
      'start': '0',
      'end': '0',
      'startOffset': 0,
      'endOffset': 4,
      'text': 'Dont',
      'paragraphlabels': [
        'General: Negative',
      ],
    },
    'id': 'RcHv5CdYBt',
    'from_name': 'label',
    'to_name': 'text',
    'type': 'paragraphlabels',
    'origin': 'manual',
  },
  {
    'value': {
      'start': '0',
      'end': '0',
      'startOffset': 9,
      'endOffset': 13,
      'text': 'hate',
      'paragraphlabels': [
        'General: Positive',
      ],
    },
    'id': 'eePG7PVYH7',
    'from_name': 'label',
    'to_name': 'text',
    'type': 'paragraphlabels',
    'origin': 'manual',
  },
];

describe('Sync: Audio, Video, and Paragraphs', () => {
  it('loads', () => {
    cy.withLabelStudio({
      annotations: [{ id: 'test', result: annotations }],
      config,
      data,
      featureFlags: {
        ff_front_1170_outliner_030222_short: true,
        fflag_feat_front_dev_2461_audio_paragraphs_seek_chunk_position_short: true,
        ff_front_dev_2715_audio_3_280722_short: true,
      },
    });
  });
});
