import json

class Artwork:

    def __init__ (self, artwork_dict, image_path=''):
        self.image_path = image_path
        self.title = artwork_dict['title']
        self.tombstone = artwork_dict['tombstone']
        self.set_images(artwork_dict)
        self.set_creators(artwork_dict)
        self.set_departments(artwork_dict)


    def set_departments (self, artwork_dict):
        self.departments = artwork_dict.get('departments', '')

    def set_creators (self, artwork_dict):
        '''Creates sorted parallel lists of roles and the creator-lists for that role e.g.
        roles ["artist", "printer"] creators [["Some painter", "Some other painter"], ["Some printer"]]
        '''
        creators = []
        creator_dict = artwork_dict.get('creators',{})
        roles = sorted(creator_dict.keys())
        for role in roles:
            creator_list = sorted(creator_dict[role])
            creators.append(creator_list)
        self.roles = roles
        self.creators = creators

    def set_images(self, artwork_dict):
        accession_number = artwork_dict.get('accession_number',None)
        self.image = self.image_path + '/images/' + artwork_dict['accession_number']+"_reduced.jpg"


    def toJSON (self):
        return self.__dict__





