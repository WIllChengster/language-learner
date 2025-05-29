import json
import whisper
from whisper import (
  utils
)
from typing import Callable, List, Optional, TextIO

class WriteJSON(utils.ResultWriter):
    extension: str = "json"
    
    def write_result(
        self, result: dict, file: TextIO, options: Optional[dict] = None, **kwargs
    ):
        json.dump(result, file, ensure_ascii=False, indent=4)


utils.WriteJSON = WriteJSON

model = whisper.load_model("large")
result = whisper.transcribe(
  model,
  './zh.mp3',
  verbose=True,
  language='zh',
  task='translate'
)

writer = utils.get_writer('json', './output')

writer(result, './output/english.json', {'output_format': 'json'})

result_transcribe = whisper.transcribe(
  model,
  './zh.mp3',
  verbose=True,
  language='zh',
  task='transcribe'
)

writer(result_transcribe, './output/native.json', {'output_format': 'json'})
