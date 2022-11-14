//
//  RNBasicCarouselModule.swift
//  RNBasicCarouselModule
//
//  Copyright © 2022 Macanthony Ahaotu. All rights reserved.
//

import Foundation

@objc(RNBasicCarouselModule)
class RNBasicCarouselModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
