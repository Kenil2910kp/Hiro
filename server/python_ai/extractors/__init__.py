"""
Language-specific extractors for HIRO multi-language support.
"""

from python_ai.extractors.py_extractor import extract_python
from python_ai.extractors.java_extractor import extract_java
from python_ai.extractors.js_extractor import extract_javascript
from python_ai.extractors.ts_extractor import extract_typescript
from python_ai.extractors.html_extractor import extract_html
from python_ai.extractors.css_extractor import extract_css

__all__ = [
    'extract_python',
    'extract_java',
    'extract_javascript',
    'extract_typescript',
    'extract_html',
    'extract_css'
]