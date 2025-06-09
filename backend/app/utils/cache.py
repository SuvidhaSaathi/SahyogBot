from functools import lru_cache
 
@lru_cache(maxsize=128)
def cached_scheme_response(prompt):
    from app.core.ibm import call_ibm_watson_api
    return call_ibm_watson_api(prompt) 