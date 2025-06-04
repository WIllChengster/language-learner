import json

# checking if we can extract pinyin from the transcribed text
with open('./hanzi-pinyin-table.json', 'r', encoding='utf-8') as hanzi_to_pinyin_file:
  hanzi_to_pinyin = json.load(hanzi_to_pinyin_file)

  with open('./output/native.json', 'r', encoding='utf-8') as f:
      data = json.load(f)
      for item in data['segments']:
        pinyin_line = ''
        for character in item['text']:
          pinyin_translation = hanzi_to_pinyin.get(character)
          if type(pinyin_translation) is str:
            pinyin_line += ' ' + pinyin_translation
          elif type(pinyin_translation) is list:
            pinyin_line += ' ' + pinyin_translation[0]
          else:
            pinyin_line += ' undefined'
            
        print(pinyin_line)

# apparently this works woohoo, but don't know which pinyin to choose if there are multiple